import {useState} from 'react'
import './App.css'

const UPLOAD_ENDPOINT = 'http://localhost:4000/upload';

function App() {
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [result, setResult] = useState();

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };


    const handleSubmission = () => {
        setIsUploading(true);
        const formData = new FormData();

        formData.append('file', selectedFile);

        fetch(
            UPLOAD_ENDPOINT,
            {
                method: 'POST',
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
                setResult(result)
            })
            .catch((error) => {
                console.error('Error:', error);
            })
            .finally(() => {
                setIsUploading(false);
            })
    };

    return (
        <div className="App">
            <h1>Upload file</h1>
            <div className="card">
                <input type="file" name="file" onChange={changeHandler} />
                <button onClick={handleSubmission}>Submit</button>

                {isUploading && <div><strong>uploading...</strong></div>}
                {result && (
                    <div>
                        <div><strong>filename</strong>: {result.files.file.filename}</div>
                        <div><strong>link</strong>: <a href={result.files.file.link} target="_blank">{result.files.file.link}</a></div>
                    </div>
                )}
                {isSelected && (
                    <div>
                        <p><strong>Click "submit" button to upload the file</strong></p>

                        <p>Filename: {selectedFile.name}</p>
                        <p>Filetype: {selectedFile.type}</p>
                        <p>Size in bytes: {selectedFile.size}</p>
                        <p>
                            lastModifiedDate:{' '}
                            {selectedFile.lastModifiedDate.toLocaleDateString()}
                        </p>
                    </div>
                )}
                <div>
                </div>
            </div>
        </div>
    )
}

export default App
