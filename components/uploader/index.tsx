'use client'

const Uploader = () => {
  async function handleUpload(event: any) {
    event.preventDefault()
    const file = event.target.file.files[0]
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    const data = await response.json()
    console.log(data)
  }

  return (
    <div className="p-10">
      <form onSubmit={handleUpload}>
        <input type="file" name="file" id="file" />
        <button type="submit">上传文件</button>
      </form>
    </div>
  )
}

export default Uploader
