<script setup>
import banner from './Banner.vue';
</script>

<template>
  <div>
    <banner />
      <div class="flex flex-col items-center mt-20">
      </div> 
  </div>
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-4">Role: Data Engineer</h1>
      <h2 class="text-2xl font-semibold mb-2">Technologies Used:</h2>
      <ul class="list-disc list-inside mb-4">
        <li>Python</li>
        <li>SQL</li>
        <li>SciKit Learn</li>
      </ul>
      <p class="text-lg mb-4">
        As a data engineer, I had the opportunity to build a principle data pipeline for CRM and billing data to bolster SeedMetrics' ELT processes. My job was to construct classes to extract, transform, and load the data. I also had the ability to create a workflow that runs the classes I built and pulls the data from end to end. This process consisted of moving the data through four different stages, landing, normalized, processed, and curated. Attached below is the code of the three classes that completes this process and allows SeedMetrics to render custom dashboards for each of their tenants! Also, I had the opportunity to perform EDA for one of our clients and built a machine learning model to predict if a case will be won or lost using Scikit Learn. 
      </p>
        <div class="border border-gray-300 p-6 rounded-lg w-full max-w-4xl mx-auto">
        <h3 class="text-xl font-semibold mb-2">Code:</h3>
        <pre class="text-sm bg-gray-100 p-4 rounded-lg text-blue-500 overflow-x-auto">
Link or File to Github Code w/ Dummy Data
        </pre>
      </div>
      <div class="border border-gray-300 p-6 rounded-lg w-full max-w-4xl mx-auto">
        <h3 class="text-xl font-semibold mb-2">Machine Learning Model:</h3>
        <pre class="text-sm bg-gray-100 p-4 rounded-lg text-blue-500 overflow-x-auto">
# ML Model for Classifying Won/Lost Boolean Values

import numpy as np
from imblearn.over_sampling import ADASYN
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.linear_model import RidgeClassifier, LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import classification_report, f1_score, precision_score, recall_score
from sklearn.model_selection import RandomizedSearchCV

# Compute median values for each column
median_values = {
    'days_to_close': activity_count2_pandas['days_to_close'].median(),
    'activity_type_count': activity_count2_pandas['activity_type_count'].median(),
}

# Fill missing values in the specified columns with their respective medians
X = activity_count2_pandas[['days_to_close', 'activity_type_count']].fillna(median_values)

# Handle missing values in the 'is_won' column with a 50/50 split between 0 and 1
is_won = activity_count2_pandas['is_won'].copy()
missing_count = is_won.isna().sum()

# Create a 50/50 split for the missing values
half_missing_count = missing_count // 2
replacement_values = np.concatenate([np.zeros(half_missing_count), np.ones(missing_count - half_missing_count)])
np.random.shuffle(replacement_values)

# Fill missing values with the 50/50 split
is_won[is_won.isna()] = replacement_values

# Convert 'is_won' to integer
is_won = is_won.astype(int)

# Now use this processed 'is_won' column
y = is_won

# Splitting into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=1234)

# Apply ADASYN to the training data
adasyn = ADASYN(random_state=1234)
X_train_adasyn, y_train_adasyn = adasyn.fit_resample(X_train, y_train)

# Creation of Pipelines to test different ML Algorithms
pipelines = {
    'rf': make_pipeline(RandomForestClassifier(random_state=1234)),
    'gb': make_pipeline(GradientBoostingClassifier(random_state=1234)),
    'ridge': make_pipeline(RidgeClassifier(random_state=1234)),
    'lasso': make_pipeline(LogisticRegression(penalty='l1', solver='liblinear', random_state=1234)),
    'enet': make_pipeline(LogisticRegression(penalty='elasticnet', solver='saga', l1_ratio=0.5, random_state=1234)),
}

# Expanded hypergrid for RandomizedSearchCV
expanded_hypergrid = {
    'rf': {
        'randomforestclassifier__n_estimators': [100, 200, 300],
        'randomforestclassifier__min_samples_split': [2, 4, 6, 8, 10],
        'randomforestclassifier__min_samples_leaf': [1, 2, 3, 4, 5]
    },
    'gb': {
        'gradientboostingclassifier__learning_rate': [0.001, 0.005, 0.01, 0.05, 0.1, 0.5],
        'gradientboostingclassifier__n_estimators': [100, 200, 300],
        'gradientboostingclassifier__max_depth': [3, 4, 5, 6, 7],
        'gradientboostingclassifier__min_samples_split': [2, 4, 6, 8, 10],
        'gradientboostingclassifier__min_samples_leaf': [1, 2, 3, 4, 5]
    },
    'ridge': {
        'ridgeclassifier__alpha': [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1, 5, 10]
    },
    'lasso': {
        'logisticregression__C': [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1, 5, 10],
        'logisticregression__solver': ['liblinear', 'saga']
    },
    'enet': {
        'logisticregression__C': [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1, 5, 10],
        'logisticregression__l1_ratio': [0.1, 0.3, 0.5, 0.7, 0.9],
        'logisticregression__solver': ['saga']
    }
}

# Using RandomizedSearchCV for hyperparameter tuning
fit_models_expanded = {}
for algo, pipeline in pipelines.items():
    model = RandomizedSearchCV(pipeline, expanded_hypergrid[algo], cv=10, n_jobs=-1, n_iter=50, random_state=1234)
    try:
        print(f'Starting training for {algo} with expanded hypergrid.')
        model.fit(X_train_adasyn, y_train_adasyn)
        fit_models_expanded[algo] = model
        print(f'{algo} has been successfully fit with expanded hypergrid.')
    except NotFittedError as e:
        print(repr(e))

# Evaluate expanded hypergrid models
for algo, model in fit_models_expanded.items():
    yhat = model.predict(X_test)
    print(f'{algo} classification report:\n{classification_report(y_test, yhat)}')
    print(f'{algo} F1 Score: {f1_score(y_test, yhat, average="weighted")}')
    print(f'{algo} Precision: {precision_score(y_test, yhat, average="weighted")}')
    print(f'{algo} Recall: {recall_score(y_test, yhat, average="weighted")}')
      </pre>
    </div>
    </div>
  </template>
  