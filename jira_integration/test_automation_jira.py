###############################################################################
# Copyright 2024 JLR. All Rights Reserved.
#
#  This script introduces a class JiraXray to facilitate the automation of testing through JIRA.
#  To run the file command to be given is
#  python -u "\path\to\test_automation_jira.py"
###############################################################################


import configparser
import time
import json  # pylint: disable=import-error
import sys  # pylint: disable=import-error
from jira import JIRA, JIRAError  # pylint: disable=import-error
from atlassian import Xray  # pylint: disable=import-error


CONFIG_JIRA_FILE = "config.ini"
class JiraXray:
    """This class represents class for JIRA Testing Automation"""

    def __init__(self, config_file, jira_auth_token=None, time_zone="0.0"):
        """
        Parameters
        ----------
        config_file     : str           | User credentials of JIRA.
        jira_auth_token : str(optional) | JIRA authentication token (default is None)
        time_zone       : str(optional) | Timezone for the user (default is '0.0')

        Example of config_file
        ----------------------
        [User_details]
        username = <username>
        password = <password>
        timezone = 5:30

        [JIRA_Project]
        project_keys = ["AADT","PID"] <list of project keys each as a string>
        project_baseurl = https://jira.devops.jlr-apps.com
        proxies = { u"http": u"http://10.224.132.196:83",
                    u"https": u"http://10.224.132.196:83",
                    u"ftp": u"http://10.224.132.196:83"}

        Description
        -----------
        Initializes the JIRA object with user credentials.
        """
        self.jira_auth_token = jira_auth_token

        config = configparser.ConfigParser()
        config.read(config_file)
        base_url = config.get("JIRA_Project", "project_baseurl", fallback=None)
        if base_url != "":
            self.url_and_keys = {"base_url": base_url}
        else:
            print("Please Provide Base URL")
            sys.exit(1)

        if jira_auth_token is None:
            self.details = {
                "username": config.get("User_details", "username"),
                "password": config.get("User_details", "password"),
                "timezone": config.get("User_details", "timezone"),
            }
        else:
            self.details = {"timezone": time_zone}
        self.jira = None
        self.xray = None
        self.proxy_dict = config.get("JIRA_Project", "proxies")

    def connect_to_jira_xray(self, jira_auth_token=None):
        """
        Parameters
        ----------
        jira_auth_token : str(optional)     | JIRA authentication token (default is None)

        Description
        -----------
        Connects to JIRA and XRAY based on user credentials.
        """
        self.jira_auth_token = jira_auth_token
        success = self.login_jira()
        if not success:
            return False
        success = self.login_xray(retry_count=10)
        return success

    def login_jira(self):
        """Connecting to JIRA"""
        if self.jira_auth_token is None:
            basic_auth = (self.details["username"], self.details["password"])
            headers = JIRA.DEFAULT_OPTIONS["headers"].copy()
            print("\n==>[JIRA AUTOMATION][INFO] Connecting to Jira using user credentials...")
        else:
            basic_auth = None
            headers = JIRA.DEFAULT_OPTIONS["headers"].copy()
            headers["Authorization"] = "Bearer " + self.jira_auth_token
            print(
                "\n==>[JIRA AUTOMATION][INFO]",
                " Connecting to Jira using user personal access token...",
            )

        try:
            self.jira = JIRA(
                server=self.url_and_keys["base_url"],
                basic_auth=basic_auth,
                options={"headers": headers},
            )
            print("[JIRA AUTOMATION][INFO] Login to Jira is successful")
            return True

        except JIRAError:
            print("[JIRA AUTOMATION][ERROR] Login to JIRA Failed.")
            return False

    def login_xray(self, retry_count):
        """Connecting to XRAY"""
        print("\n==>[JIRA AUTOMATION][INFO] Connecting to Xray...")
        errors = 0
        xray_error_flag = True
        while xray_error_flag:
            try:
                if self.jira_auth_token is None:
                    self.xray = Xray(
                        self.url_and_keys["base_url"],
                        self.details["username"],
                        self.details["password"],
                    )
                else:
                    self.xray = Xray(
                        self.url_and_keys["base_url"],
                        token=self.jira_auth_token,
                    )
                print("[JIRA AUTOMATION][INFO] Login to xray is successful")
                xray_error_flag = False
            except JIRAError:
                time.sleep(0.5)
                errors += 1
                if errors >= retry_count:
                    print(
                        "[JIRA AUTOMATION][ERROR]",
                        f"Login to X-Ray Unsuccessful after {retry_count} trials.",
                    )
                    break
        return not xray_error_flag

    def update(self, test_exec_key, log_file):
        """
        Parameters
        ----------
        log_file          : str  | File path of the log file

        Description
        -----------
        Updates the status of the test cases in the test Execution Record.
        """

        with open(log_file, "r", encoding="utf-8") as file:
            data = json.load(file)
        for i in data["test_case_results"]:
            test_case_id = i["xray_test_id"]
            status = i["test_status"]
            if status == 1:
                status = "PASS"
            else:
                status = "FAIL"
            try:
                runs = self.xray.get_test_runs(test_case_id)
            except JIRAError:
                print("[JIRA AUTOMATION][ERROR] Wrong Test Case ID: Moving on to next updation")
                continue
            run_id = runs[-1]["id"]
            for run in runs:
                if run["testExecKey"] == test_exec_key:
                    run_id = run["id"]
            runs[-1]["status"] = status
            self.xray.update_test_run_status(run_id, status)

        print("[JIRA AUTOMATION][INFO] Testcase status are updated")

    def create_test_execution(self, meta_data):
        """
        Parameters
        ----------
        meta_data : dict     | meta_data for creating the test execution record
        Example of meta_data:
            meta_data = {
            "project":
            {
                "key": "AADT"
            },
            "summary": "Software Update ORIN- SWE.5 Test-2",
            "description": "Creating of an issue",
            "issuetype": {
                "name": "Test Execution"
            },
            "customfield_15004": "TAMS-97"
        }

        Returns
        -------
        TestExecutionID     | The created test execution ID

        Description
        -----------
        Generates an empty test execution record.
        """
        issue_key = self.jira.create_issue(fields=meta_data)
        print("[JIRA AUTOMATION][INFO] Empty Test Execution Record Created :", issue_key)
        return issue_key

    def add_test_to_execution(self, test_exec_record, log_file):
        """
        Parameters
        ----------
        test_exec_record : str      | Test execution record ID
        log_file          : str      | File path of the log file
        (log_file contains - Tests, Test Runs and Run IDs, Status, etc.)

        Description
        -----------
        Adds the test cases to the test execution record and sets the default status as 'TODO'.
        """
        try:
            with open(log_file, "r", encoding="utf-8") as file:
                data = json.load(file)
            test_cases = [i["xray_test_id"] for i in data["test_case_results"]]
            self.xray.update_test_execution(test_exec_record, add=test_cases)
            for test_case in data["test_case_results"]:
                self.jira.transition_issue(test_case["xray_test_id"], "IN PROGRESS")
            print("[JIRA AUTOMATION][INFO] Testcases added to the Test Execution Record")
        except JIRAError:
            print("")

    def add_attachments(self, issue_key, filename):
        """
        Parameters
        ----------
        issue_key : str     | Issue key for the test execution record
        filename  : str     | File path of the attachment

        Description
        -----------
        Adds an attachment to a given test execution record.
        """
        try:
            self.jira.add_attachment(issue=issue_key, attachment=filename)
            print("[JIRA AUTOMATION][INFO] Attachments are added to the Test Execution Record")
        except JIRAError:
            print("[JIRA AUTOMATION][ERROR] Addition of attachments was unsuccessful.")

    def get_test_case_status(self, test_case_id):
        """
        Parameters
        ----------
        test_case_id : str      | Identifier of the test case

        Returns
        -------
        Status of the test case : str

        Description
        -----------
        Gets the current status of a specific test case.
        """
        runs = self.xray.get_test_runs(test_case_id)
        latest_run_id = runs[-1]["id"]
        return self.xray.get_test_run_status(latest_run_id)


def create_jira_object():
    """
    Creating a JIRA Object
    """
    created_jira_obj = JiraXray(CONFIG_JIRA_FILE)
    return created_jira_obj
