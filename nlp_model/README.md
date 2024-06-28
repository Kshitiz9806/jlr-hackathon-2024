### Sprinty NLP Skill Prediction Model
This project implements a machine learning model to predict the skills required for a job description based on the provided text.

### Getting Started
This guide assumes you have Python 3.6 or later installed along with the required libraries specified in the requirements.txt file.

* ***Install required libraries***: pip install -r requirements.txt
* **Prepare your data**: The project expects your data in a specific format. You can use the provided scripts sprinty_data_creation.py and creating_skills_data.py to convert your data (refer to their docstrings for details). These scripts are provided as examples and might require adjustments based on your data source format.

### Running the Model
The primary functionalities are encapsulated in the following scripts:

* **train_and_save_models.py**: This script trains machine learning models for multi-label classification of skills based on a provided CSV file containing labeled text data. It performs GridSearchCV to find the best hyperparameters for each model and saves the trained models along with a fitted TF-IDF vectorizer.
* **predict_skills.py**: This script takes a new text description as input, loads the pre-trained models and TF-IDF vectorizer, predicts the relevant skills for the new text, and returns a vector of predicted skills.
* **visualize_metrics.py**: This script takes the ground truth labels and predicted labels and provides visualizations for various evaluation metrics (accuracy, F1 score, precision, recall) along with a confusion matrix for each skill.
An example usage is provided in example_prediction.py. This script demonstrates how to train models, predict skills for a new text description, and visualize the evaluation metrics on the entire dataset.

**Note:** Make sure to replace 'parsed_data.csv' with the path to your actual CSV file containing labeled text data when running the training script (train_and_save_models.py). Similarly, update the path to the model directory ('models') if you save your models in a different location.

### Folder Structure
The nlp_model directory contains the following:

* **src directory**: Contains all the core Python scripts for training, prediction, and evaluation.
* **models directory**: Stores the trained models and TF-IDF vectorizer generated during training.
* **example_prediction.py**: An example script demonstrating model training, prediction, and evaluation.
* **requirements.txt**: Lists the required Python libraries for running the project.
* **Other files (depending on usage)**: Data files used for training and evaluation.