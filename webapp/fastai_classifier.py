#!/venv/bin python

import os
import sys
from flask import Flask, Blueprint, current_app, render_template
import numpy as np

from fastai.vision import *
from inceptionresnet import inceptionresnetv2

image_classifier = Blueprint('image_classifier', __name__)

app = Flask(__name__)

model_links = {
    'InceptionResNetv2':  'https://arxiv.org/pdf/1712.00559.pdf'
}


def init_learner(model_name):
    learn = load_learner(path='static/weights/',
                         file='inceptionresnetv2.pkl', device='cpu')
    learn.model = learn.model.eval()
    return learn


def get_name():
    # inceptionresnetv2 default for fastai classification
    return os.getenv('NNET', 'InceptionResNetv2')


def get_link(model_name):
    return model_links[model_name]


@image_classifier.route("/image-classifier")
def show():
    model_name = get_name()
    model_link = get_link(model_name)
    return render_template("image-classifier.html", mail=current_app.config['MAIL_USERNAME'], name=model_name, link=model_link)


@image_classifier.route("/image-classifier/<filename>", methods=['GET'])
def analyze(filename):
    print(filename)
    model_name = get_name()
    model_link = get_link(model_name)
    print(f'model name: {model_name}')

    if not os.path.isfile(os.path.join(current_app.config['UPLOAD_FOLDER'], filename)):
        print('error, filename not found in static/uploads/<filename>')
        return render_template("image-classifier.html", filename=filename, name=model_name, link=model_link, mail=current_app.config['MAIL_USERNAME'])

    learn = init_learner(model_name)
    print('init model successfully')

    _, _, preds = learn.predict(open_image(os.path.join(
        current_app.config['UPLOAD_FOLDER'], filename)))
    print('prediction done')

    # Load Imagenet Synsets
    with open(os.path.join(current_app.config['IMAGENET_FOLDER'], 'imagenet_synsets.txt'), 'r') as f:
        synsets = f.readlines()

    # create index: class dictionary
    synsets = [x.strip() for x in synsets]
    synsets = [line.split(' ') for line in synsets]
    key_to_classname = {spl[0]: ' '.join(spl[1:]) for spl in synsets}

    with open(os.path.join(current_app.config['IMAGENET_FOLDER'], 'imagenet_classes.txt'), 'r') as f:
        class_id_to_key = f.readlines()

    class_id_to_key = [x.strip() for x in class_id_to_key]

    # get highest confidence index and value
    preds_sorted, idxs = preds.sort(descending=True)

    # extract classname from index
    idxs = idxs.numpy()[:3]

    class_keys = [class_id_to_key[i] for i in idxs]
    class_names = [', '.join(
        [str(y) for y in key_to_classname[x].split(",", 2)[:2]]) for x in class_keys]
    percent = [round(elem, 2)
               for elem in (preds_sorted[:3].numpy() * 100).tolist()]

    print(f'predicted classes: {class_names}')
    print(f'confidence: {percent}')

    preds = []
    for i in range(len(class_names)):
        preds.append({'class': class_names[i], 'percent': percent[i]})

    return json.dumps(preds)
