import pandas as pd
import numpy as np
import joblib
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, multilabel_confusion_matrix, f1_score, precision_score, recall_score
import warnings
import os

warnings.filterwarnings('ignore')

def train_and_save_models(df_path, model_save_path):
    df = pd.read_csv(df_path)
    
    X = df['text'].values
    y = np.array(df['labels'].tolist())


    tfidf_vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
    X_tfidf = tfidf_vectorizer.fit_transform(X)


    joblib.dump(tfidf_vectorizer, f"{model_save_path}/tfidf_vectorizer.pkl")


    best_models = []
    model_names = ["LogisticRegression", "SVC", "RandomForestClassifier", "MultinomialNB"]

    new_y = []
    for i in y:
        _y = np.fromstring(i.replace("[", "").replace("]", ""), dtype=int, sep=',')
        new_y.append(_y)
    new_y = np.array(new_y)
    y = new_y


    num_skills = y.shape[1]


    for skill_idx in range(num_skills):
        print(f'Processing skill {skill_idx + 1}/{num_skills}...')
        
        y_skill = y[:, skill_idx]
        
        X_train, X_test, y_train, y_test = train_test_split(X_tfidf, y_skill, test_size=0.2, random_state=42)
        
        classifiers = {
            'LogisticRegression': LogisticRegression(max_iter=1000),
            'SVC': SVC(),
            'RandomForestClassifier': RandomForestClassifier(),
            'MultinomialNB': MultinomialNB()
        }
        
        best_accuracy = 0
        best_model = None
        for model_name, classifier in classifiers.items():
            try:
                
                param_grid = {}
                if model_name == 'LogisticRegression':
                    param_grid = {'C': [0.1, 1.0, 10.0], 'penalty': ['l1', 'l2']}
                elif model_name == 'SVC':
                    param_grid = {'C': [0.1, 1.0, 10.0], 'kernel': ['linear', 'rbf']}
                elif model_name == 'RandomForestClassifier':
                    param_grid = {'n_estimators': [50, 100, 200]}
                elif model_name == 'MultinomialNB':
                    param_grid = {'alpha': [0.1, 0.5, 1.0]}
                
                grid_search = GridSearchCV(classifier, param_grid, cv=5, scoring='accuracy')
                grid_search.fit(X_train, y_train)
                
                if grid_search.best_score_ > best_accuracy:
                    best_accuracy = grid_search.best_score_
                    best_model = grid_search.best_estimator_
            except Exception as e:
                print(f'Error in {model_name}: {str(e)}')
                continue
        
        best_models.append(best_model)
        
        joblib.dump(best_model, f"{model_save_path}/best_model_skill_{skill_idx}.pkl")
        
        if best_model:
            y_pred = best_model.predict(X_test)
            accuracy = accuracy_score(y_test, y_pred)
            print(f'Best model ({type(best_model).__name__}) accuracy for skill {skill_idx + 1}: {accuracy:.4f}')
        else:
            print(f'No valid model found for skill {skill_idx + 1}')
    
    return best_models

def predict_skills(text, model_load_path):
    
    tfidf_vectorizer = joblib.load(f"{model_load_path}/tfidf_vectorizer.pkl")
    
    
    X_tfidf = tfidf_vectorizer.transform([text])
    
    
    num_skills = len([file for file in os.listdir(model_load_path) if file.startswith('best_model_skill_')])
    best_models = [joblib.load(f"{model_load_path}/best_model_skill_{i}.pkl") for i in range(num_skills)]
    
    
    skills = ["capl", "autosar classic", "autosar adaptive", "python", "c++", 
           "msosa", "corvus", "canoe", "cmake", 
           "debugging", "gherkin", "communication", "testing", "trace32", "trm"]
    skill_predictions = []
    print("REQUIRED SKILLS: ", end = "")
    for idx, model in enumerate(best_models):
        if (model.predict(X_tfidf)[0] == 1):
            print(skills[idx], end = ", ")
        skill_predictions.append(model.predict(X_tfidf)[0])
    print()
    return skill_predictions

def visualize_metrics(y_true, y_pred):
    metrics = {
        'F1 Score': f1_score(y_true, y_pred, average="weighted"),
        'Precision': precision_score(y_true, y_pred, average="weighted"),
        'Recall': recall_score(y_true, y_pred, average="weighted"),
        'Accuracy': accuracy_score(y_true, y_pred)
    }
    
    
    plt.figure(figsize=(10, 5))
    plt.bar(metrics.keys(), metrics.values(), color='skyblue')
    plt.title("Evaluation Metrics")
    plt.ylabel("Score")
    plt.ylim(0, 1)
    for i, v in enumerate(metrics.values()):
        plt.text(i, v + 0.02, f"{v:.4f}", ha='center', va='bottom')
    plt.show()

    
    mcm = multilabel_confusion_matrix(y_true, y_pred)
    for i, matrix in enumerate(mcm):
        sns.heatmap(matrix, annot=True, fmt='d', cmap='Blues', cbar=False)
        plt.title(f'Confusion Matrix for Skill {i + 1}')
        plt.xlabel('Predicted')
        plt.ylabel('True')
        plt.show()
