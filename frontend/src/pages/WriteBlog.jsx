// BlogEditor.jsx
import React, { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import CodeBlock from '@tiptap/extension-code-block'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Color from '@tiptap/extension-color'
import "../styles/WriteBlog.css";
import Alert from '../components/Alert'


const alertConfig = {
  type: 'error',
  msg: ''
};
const MenuBar = ({ editor }) => {
  if (!editor) return null

  const addImage = () => {
    const url = window.prompt('Enter image URL')
    if (url) editor.chain().focus().setImage({ src: url }).run()
  }

  return (
    <div className="menu-wrap">
      <button onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'bg-gray-300 p-1 rounded' : 'p-1'}>
        Bold
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'bg-gray-300 p-1 rounded' : 'p-1'}>
        Italic
      </button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'bg-gray-300 p-1 rounded' : 'p-1'}>
        Underline
      </button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'bg-gray-300 p-1 rounded' : 'p-1'}>
        Strike
      </button>
      <button onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={editor.isActive('highlight') ? 'bg-gray-300 p-1 rounded' : 'p-1'}>
        Highlight
      </button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'bg-gray-300 p-1 rounded' : 'p-1'}>
        • List
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'bg-gray-300 p-1 rounded' : 'p-1'}>
        1. List
      </button>
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'bg-gray-300 p-1 rounded' : 'p-1'}>
        Quote
      </button>
      <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'bg-gray-300 p-1 rounded' : 'p-1'}>
        Code
      </button>
      <button onClick={addImage} className="p-1">Image</button>
      <button onClick={() => editor.chain().focus().setTextAlign('left').run()}>Left</button>
      <button onClick={() => editor.chain().focus().setTextAlign('center').run()}>Center</button>
      <button onClick={() => editor.chain().focus().setTextAlign('right').run()}>Right</button>
      <button onClick={() => editor.chain().focus().undo().run()}>Undo</button>
      <button onClick={() => editor.chain().focus().redo().run()}>Redo</button>
    </div>
  )
}

export default function WriteBlog() {
  const [title, setTitle] = useState('');
  const [showAlert, setAlert] = useState(false);
  const [imageFile, setImageFile] = useState(null);       // stores the file object
  const [previewURL, setPreviewURL] = useState(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
      CodeBlock,
      Highlight,
      Color,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '<p>Start writing your blog...</p>',
  });

  const handleTitle = (e) => {
    e.preventDefault();
    console.log('settitel',e.target.value);
    
    setTitle(e.target.value);
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setPreviewURL(URL.createObjectURL(file));
      console.log(file);
      console.log(URL.createObjectURL(file));

    } else {
      alert('Please select a valid image file.');
    }
  };

  const handleSubmit = (e) => {
     e.preventDefault();
    const content = editor.getHTML();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", "Mukesh");
    formData.append("image", imageFile);

    if (
      title.trim() === "" ||
      content.trim() === "<p></p>" ||
      content.trim() === "<p>Start writing your blog...</p>"
    ) {
      alertConfig.msg = "Title or content empty!";
      alertConfig.type = "error";
      toggleAlert();
      return;
    }

    fetch("http://localhost:5000/api/blogs", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          alertConfig.type = "success";
          alertConfig.msg = "Blog submitted successfully.";
          toggleAlert();
          // Clear all the input fields at this stage as blog is submitted successfully
          setTitle("");
          setImageFile(null);
          setPreviewURL(null);
         editor.commands.clearContent();
        }
        return res.json();
      })
      .then((data) => console.log("Blog created:", data))
      .catch((err) => {
        alertConfig.type = "error";
        alertConfig.msg = "Ohh!!! Server error, not able to submit blog.";
        toggleAlert();
        console.error("Error:", err);
      });
  };


  const toggleAlert = () => {
    setAlert(!showAlert)
  };
  return (
    <div className='writeblog-wrapper'>
      {showAlert && <Alert
        type={alertConfig.type}
        message={alertConfig.msg}
        onClose={toggleAlert}
      />}
      <h3 className='text-center'>Create a New Blog Post</h3>
      <div className="editor-container">
        <div className='title-wrap'>
          <label htmlFor="title">Title:</label>
          <input onChange={handleTitle}
            type="text" id="title" name="title" value={title} placeholder="Enter your Blog Title" />
        </div>
        <div className="imageUploader">
          <label htmlFor="thumbnail" className="fileLabel">Blog thumbnail:</label>
          <input onChange={handleImageChange}
            type="file"
            id="thumbnail"
            accept="image/*"
            className="fileInput"
          />
          {previewURL && <img src={previewURL} alt="preview" height="50" width="50" style={{ borderRadius: '8px' }} />}
          <span>{imageFile?.name}</span>
        </div>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} className="editor-content" />
        <button className="btn btn-primary right submit" type='button' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};
