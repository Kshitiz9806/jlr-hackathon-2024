from src.sprinty_grid_search_adas import train_and_save_models, predict_skills, visualize_metrics
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer

if __name__ == "__main__":
    best_models = train_and_save_models('parsed_data.csv', 'models')

    text = "AP Autosar sample application and KT Creation of an adaptive sample application with arxml and methods to be archieved as an example project for any future adaptive application development. Explore adaptive autosar dev environment, so i can find gaps if any with respect to NVIDIA apis and document them "
    predicted_skills = predict_skills(text, 'models')
    print("Text: ", text)
    print("Predicted skills vector:", predicted_skills)

    df = pd.read_csv('parsed_data.csv')
    y_true = np.array(df['labels'].tolist())
    tfidf_vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
    X_tfidf = tfidf_vectorizer.fit_transform(df['text'].values)
    y_pred = np.hstack([model.predict(X_tfidf)[:, np.newaxis] for model in best_models])
    print("TRUE:", y_true)
    print("PREDICTED:", y_pred)
    visualize_metrics(y_true, y_pred)
