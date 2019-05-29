from flask import Flask, request, render_template
app = Flask(__name__, template_folder='templates')

@app.route("/")
def physics():
    return render_template('index.html')

if __name__ == "__main__":
    app.debug = True
    app.run()
