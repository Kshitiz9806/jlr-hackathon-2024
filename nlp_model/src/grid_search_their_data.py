import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, multilabel_confusion_matrix, f1_score, precision_score, recall_score
import warnings
import json

warnings.filterwarnings('ignore')  # Suppress warnings for cleaner output
 
# Load data from JSON file (replace with your actual loading method)
with open("skills_data.json", 'r') as f:
    data = json.load(f)
 
df = pd.DataFrame(data)

# df = pd.read_csv("parsed_data.csv")
 
# Assuming df['labels'] is already in numpy array format
X = df['text'].values
y = np.array(df['labels'].tolist())  # Convert list of lists to numpy array
 
# Encode text using TF-IDF vectorizer
tfidf_vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
X_tfidf = tfidf_vectorizer.fit_transform(X)
 
# Initialize a list to store the best models for each skill
best_models = []
model_names = ["LogisticRegression", "SVC", "RandomForestClassifier", "MultinomialNB"]

# Get number of skills (number of classes)
num_skills = y.shape[1]

# Iterate over each skill
for skill_idx in range(num_skills):
    print(f'Processing skill {skill_idx + 1}/{num_skills}...')
    # Extract labels for current skill
    y_skill = y[:, skill_idx]
    # Split data into train and test sets
    X_train, X_test, y_train, y_test = train_test_split(X_tfidf, y_skill, test_size=0.2, random_state=42)
    # Define classifiers to be tested in GridSearchCV
    classifiers = {
        'LogisticRegression': LogisticRegression(max_iter=1000),
        'SVC': SVC(),
        'RandomForestClassifier': RandomForestClassifier(),
        'MultinomialNB': MultinomialNB()
    }
    # Perform GridSearchCV for each classifier
    best_accuracy = 0
    best_model = None
    for model_name, classifier in classifiers.items():
        try:
            # Define parameter grid for GridSearchCV
            param_grid = {}
            if model_name == 'LogisticRegression':
                param_grid = {'C': [0.1, 1.0, 10.0], 'penalty': ['l1', 'l2']}
            elif model_name == 'SVC':
                param_grid = {'C': [0.1, 1.0, 10.0], 'kernel': ['linear', 'rbf']}
            elif model_name == 'RandomForestClassifier':
                param_grid = {'n_estimators': [50, 100, 200]}
            elif model_name == 'MultinomialNB':
                param_grid = {'alpha': [0.1, 0.5, 1.0]}
            # Perform GridSearchCV
            grid_search = GridSearchCV(classifier, param_grid, cv=5, scoring='accuracy')
            grid_search.fit(X_train, y_train)
            # Select best model
            if grid_search.best_score_ > best_accuracy:
                best_accuracy = grid_search.best_score_
                best_model = grid_search.best_estimator_
        except Exception as e:
            print(f'Error in {model_name}: {str(e)}')
            continue
    # Store the best model for the current skill
    best_models.append(best_model)
    # Evaluate the best model on the test set
    if best_model:
        y_pred = best_model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        print(f'Best model ({best_model.__class__.__name__}) accuracy for skill {skill_idx + 1}: {accuracy:.4f}')
    else:
        print(f'No valid model found for skill {skill_idx + 1}')
 
# Print evaluation metrics for the entire multi-label classification
y_pred_multi = np.hstack([model.predict(X_tfidf)[:, np.newaxis] for model in best_models])
print("Evaluation Metrics:")
print(f'Weighted F1 Score: {f1_score(y, y_pred_multi, average="weighted"):.4f}')
print(f'Weighted Precision: {precision_score(y, y_pred_multi, average="weighted"):.4f}')
print(f'Weighted Recall: {recall_score(y, y_pred_multi, average="weighted"):.4f}')
print("Multilabel Confusion Matrix:")
print(multilabel_confusion_matrix(y, y_pred_multi))
