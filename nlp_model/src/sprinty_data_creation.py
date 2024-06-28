import csv
import pandas as pd

def parse_csv(filename):
    """Parses a CSV file and generates data in the desired format.

    Args:
        filename: The path to the CSV file.

    Returns:
        A pandas DataFrame with columns "text" and "labels".
    """
    data = []
    skills = ["capl", "autosar classic", "autosar adaptive", "python", "c++", 
            "msosa", "corvus", "canoe", "cmake", 
            "debugging", "gherkin", "communication", "testing", "trace32", "trm"]
    skill_importance = {skill: i for i, skill in enumerate(skills)}

    with open(filename, 'r') as f:
        reader = csv.DictReader(f)
    for row in reader:
        labels = [0] * len(skills)
        skills_used = [s.strip() for s in row['Skills'].lower().split(",") if s.strip()]
        for index, skill in enumerate(skills_used):
            if skill in skill_importance:
                labels[skill_importance[skill]] = 1

        text_to_add = row['Summary'] + ' ' + row['Description'] + ' '
        for field in ['customfield_10010', 'customfield_11351', 'customfield_11352']:
            if row[field].strip():
                text_to_add += row[field].strip() + ' '
        data.append({"text":text_to_add.strip(), "labels": labels})
    return pd.DataFrame(data)[["text", "labels"]]

df = pd.read_excel("sprinty_team_data.xlsx")
df.to_csv("sprinty_team_data.csv")
dataframe = parse_csv("sprinty_team_data.csv")

dataframe.to_csv("parsed_data.csv")