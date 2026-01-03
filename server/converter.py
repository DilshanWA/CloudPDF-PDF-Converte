import os
import uuid
import subprocess
from PIL import Image


class Converter:
    def __init__(self, file_manager):
        self.file_manager = file_manager

    def convert_file(self, file):
        filename = file.filename
        name, ext = os.path.splitext(filename)
        ext = ext.lower()

        filepath = self.file_manager.save_file(file)

        
        command = [
                "soffice",
                "--headless",
                "--convert-to", "pdf",
                filepath,
                "--outdir", self.file_manager.upload_folder
            ]
        result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if result.returncode != 0:
                self.file_manager.remove_file(filepath)
                raise RuntimeError(f"Conversion failed for {filename}: {result.stderr.decode()}")

        self.file_manager.remove_file(filepath)
        return f"{name}.pdf"
