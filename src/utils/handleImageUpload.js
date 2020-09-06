async function handleImageUpload(image) {
  const data = new FormData();
  data.append('file', image);
  data.append('upload_preset', 'instagram');
  data.append('cloud_name', 'dbg0cr6ei');
  const response = await fetch(
    'https://api.cloudinary.com/v1_1/dbg0cr6ei/image/upload',
    {
      method: 'POST',
      accept: 'application/json',
      body: data,
    }
  );
  const jsonResponse = await response.json();
  return jsonResponse.url;
}

export default handleImageUpload;
