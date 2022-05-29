# ABISS: Advanced Biometric Identification Security System

How to Use

Clone the repository:

```bash
git clone https://github.com/Khushii-Arora/ABISS-Engage2022.git
```

In the project directory, you can run:

```bash
npm install --save
npm start
```

This will run app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to create descriptors profile

This App uses descriptors profile of known faces (facial feature vector of 128 array of number) stored in JSON format as reference for face recognition. A sample profile of a visitors is located in folder `src/database/face_database.json`

### JSON Profile

The JSON profile contains visitors' nickname and array of 5-10 facial feature vector generate per visitor from sample photos. We don't store sample photos in the app to save processing time and optimize application size. You can create new descriptor (feature vector) by uploading photo to the app and check `Show Descriptors` to see the descriptor. If there're multiple faces detected in one photo, app will show all descriptors.

JSON File Format:

```text
{
  "id1": {
	"rollno":id1
        "name": "nickname",
	"permission": permission status,
      "descriptors": [
      [FEATURE_VECTOR],[FEATURE_VECTOR],...
    ]
  },
  "id2": {
	"rollno":id2
        "name": "nickname",
	"permission": permission status,
    "descriptors": [
      [FEATURE_VECTOR],[FEATURE_VECTOR],...
    ]
  },
  ...
}
```

Note:

- `id1`, `id2` are object keys to be referred by the App
- `nickname` will be displayed when app recognizes the face
- `FEATURE_VECTOR` is array of 128 number facial feature known as `descriptor` in face-api.js
