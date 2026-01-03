import uuid
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_cors import CORS

from file_manager import FileManager
from converter import Converter
from merge import Merger
from compressor import Compressor
from protector import Protector
from split import PdfSpliter
from image_converter import Image_converter

import os

app = Flask(__name__)
CORS(app)

file_manager = FileManager()
converter = Converter(file_manager)
image_converter = Image_converter(file_manager)
merger = Merger(file_manager)
compressor = Compressor(file_manager)
protector = Protector(file_manager)
spliter = PdfSpliter(file_manager)

@app.route('/convert', methods=['POST'])
def convert_endpoint():
    if 'files' not in request.files:
        return jsonify({"error": "No files part"}), 400
    files = request.files.getlist('files')
    if not files or files[0].filename == '':
        return jsonify({"error": "No selected files"}), 400

    try:
        pdf_files = [converter.convert_file(f) for f in files]

        if len(pdf_files) == 1:
            pdf_url = url_for('download_file', filename=pdf_files[0], _external=True)
            return jsonify({
                "message": "Single file converted",
                "pdf_file": pdf_files[0],
                "pdf_url": pdf_url,
                "files_count": len(files)
            })
        else:
            pdf_paths = [os.path.join(file_manager.upload_folder, pdf) for pdf in pdf_files]
            zip_id = uuid.uuid4().hex
            zip_filename = f"converted_{zip_id}.zip"
            zip_path = file_manager.create_zip(pdf_paths, zip_filename)
            zip_url = url_for('download_zip', filename=zip_filename, _external=True)

            return jsonify({
                "message": "Multiple files converted and zipped",
                "zip_file": zip_filename,
                "zip_url": zip_url,
                "files_count": len(files)
            })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/imageconverter', methods=['POST'])
def image_to_pdf_endpoint():
    if 'files' not in request.files:
        return jsonify({"error": "No files part"}), 400
    files = request.files.getlist('files')
    if not files or files[0].filename == '':
        return jsonify({"error": "No selected files"}), 400
    
    checkbox = request.form.get('check_box_value', 'false').lower() == 'true'

    try:
       pdf_files = [image_converter.convert_image_to_pdf(f) for f in files]
       pdf_paths = [os.path.join(file_manager.upload_folder, pdf) for pdf in pdf_files]
       
       if checkbox and len(pdf_files) > 1:
           
           merged_pdf_name = f"cloudpdf-merged-images-pdf.pdf"
           merged_pdf_path = os.path.join(file_manager.upload_folder, merged_pdf_name)
           
           merger.merge_pdf_paths(pdf_paths, merged_pdf_path)
           
           pdf_url = url_for('download_file', filename=merged_pdf_name, _external=True)
           return jsonify({
               "message": "Images converted and merged into single PDF",
               "pdf_file": merged_pdf_name,
               "pdf_url": pdf_url,
               "files_count": len(files)
           })
       else:
           if len(pdf_files) == 1:
                pdf_url = url_for('download_file', filename=pdf_files[0], _external=True)
                return jsonify({
                     "message": "Single image converted to PDF",
                     "pdf_file": pdf_files[0],
                     "pdf_url": pdf_url,
                     "files_count": len(files)
                })
           else:
                zip_id = uuid.uuid4().hex
                zip_filename = f"image_pdfs_{zip_id}.zip"
                zip_path = file_manager.create_zip(pdf_paths, zip_filename)
                zip_url = url_for('download_zip', filename=zip_filename, _external=True)

                return jsonify({
                    "message": "Multiple images converted to PDFs and zipped",
                    "zip_file": zip_filename,
                    "zip_url": zip_url,
                    "files_count": len(files)
                })
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500
           
        
           


@app.route('/merge', methods=['POST'])
def merge_endpoint():
    if 'files' not in request.files:
        return jsonify({"error": "No files part"}), 400
    files = request.files.getlist('files')
    if not files or files[0].filename == '':
        return jsonify({"error": "No selected files"}), 400

    try:
        merged_pdf = merger.merge_pdfs(files)
        pdf_url = url_for('download_file', filename=merged_pdf, _external=True)

        return jsonify({
            "message": "PDFs merged successfully",
            "pdf_file": merged_pdf,
            "pdf_url": pdf_url,
            "files_count": len(files)
        })
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500


@app.route('/compress', methods=['POST'])
def compress_endpoint():
    if 'files' not in request.files:
        return jsonify({"error": "No files part"}), 400
    files = request.files.getlist('files')
    if not files or files[0].filename == '':
        return jsonify({"error": "No selected file"}), 400

    quality = request.form.get('qualityOption', 'medium').lower()
    if quality not in ['low', 'medium', 'high']:
        quality = 'medium'

    try:
        compressed_pdf = compressor.compress(files[0], quality)
        pdf_url = url_for('download_file', filename=compressed_pdf, _external=True)

        return jsonify({
            "message": "PDF compressed successfully",
            "pdf_file": compressed_pdf,
            "pdf_url": pdf_url,
            "quality": quality
        })
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500


@app.route('/protect', methods=['POST'])
def protect_endpoint():
    if 'files' not in request.files:
        return jsonify({"error":" No files part"}), 400
    files = request.files.getlist('files')
    if not files or files[0].filename == '':
        return jsonify({"error": "No selected file"}), 400
    password = request.form.get('password', '')
    if not password:
        return jsonify({"error": "No password provided"}), 400
    try:
        pdf_files = [protector.protect_pdf(f, password) for f in files]
        
        if len(pdf_files) == 1:
            pdf_url = url_for('download_file', filename=pdf_files[0], _external=True)
            return jsonify({
                "message": "Single PDF protected successfully",
                "pdf_file": pdf_files[0],
                "pdf_url": pdf_url,
                "files_count": len(files)
            })
            
        else:
            pdf_paths = [os.path.join(file_manager.upload_folder, pdf) for pdf in pdf_files]
            zip_id = uuid.uuid4().hex
            zip_filename = f"protected_{zip_id}.zip"
            zip_path = file_manager.create_zip(pdf_paths, zip_filename)
            zip_url = url_for('download_zip', filename=zip_filename, _external=True)

            return jsonify({
                "message": "Multiple PDFs protected and zipped successfully",
                "zip_file": zip_filename,
                "zip_url": zip_url,
                "files_count": len(files)
            })
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route('/split', methods=['POST'])
def split_endpoint():
    if 'files' not in request.files:
        return jsonify({"error": "No files part"}), 400
    files = request.files.getlist('files')
    if not files or files[0].filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    mode = request.form.get('mode', 'allPages').lower()
    page_range = request.form.get('page_range', '')

    try:
        split_files = []
        if mode ==  'allpages':
            for file in files:
                split_files.extend(spliter.split_pdf(file))
        elif mode == 'custom':
            for file in files:
                split_files.extend(spliter.split_pdf_custom_range(file, page_range))

        if len(split_files) == 1:
            pdf_url = url_for('download_file', filename=split_files[0], _external=True)
            return jsonify({
                "message": "Single PDF split successfully",
                "pdf_file": split_files[0],
                "pdf_url": pdf_url,
                "files_count": len(files)
            })
        else:
            pdf_paths = [os.path.join(file_manager.upload_folder, pdf) for pdf in split_files]
            zip_id = uuid.uuid4().hex
            zip_filename = f"splitted_{zip_id}.zip"
            zip_path = file_manager.create_zip(pdf_paths, zip_filename)
            zip_url = url_for('download_zip', filename=zip_filename, _external=True)
            print(len(split_files))
            
            return jsonify({
                "message": "Multiple PDFs split and zipped successfully",
                "zip_file": zip_filename,
                "zip_url": zip_url,
                "files_count": len(split_files)
            })
            
            
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500


@app.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    return send_from_directory(file_manager.upload_folder, filename, as_attachment=True)


@app.route('/download/zip/<filename>', methods=['GET'])
def download_zip(filename):
    return send_from_directory(file_manager.zip_folder, filename, as_attachment=True)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
