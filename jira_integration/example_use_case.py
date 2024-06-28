import test_automation_jira as jira_auth
import csv
import pandas as pd
import requests
from requests.auth import HTTPBasicAuth
import configparser

def create_tickets(tasks, assignees):
    # assignees - list of csdid's of the assignees
    # tasks - dictionary: keys are summary, description, acceptance_crit, i_want, so_that
    config = configparser.ConfigParser()
    config.read('config.ini')

    jira_username = config['JIRA']['username']
    jira_password = config['JIRA']['password']
    jira_url = config['JIRA']['url']
    proxies = {
        "http": config['Proxies']['proxy_http'],
        "https": config['Proxies']['proxy_https']
    }

    project_key = 'AEX'
    session = requests.Session()
    session.auth = HTTPBasicAuth(jira_username, jira_password)


    jira_obj = jira_auth.create_jira_object()
    jira_obj.connect_to_jira_xray()
    for idx, task in enumerate(tasks):
        fields = {
            "project":
                    {
                        "key": project_key
                    },
            "summary": task["summary"],
            "description": task["description"],
            "assignee": {"name": assignees[idx]},
            "issuetype": {
                        "name": "Story"
                    },
            "customfield_10010": task["acceptance_crit"],
            "customfield_11351": task["i_want"],
            "customfield_11352": task["so_that"]
        }
        issue_id = jira_obj.create_test_execution(fields)
        print("ISSUE CREATED WITH ID = ", issue_id)