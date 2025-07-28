// BlogEditor.jsx
import React, { useEffect, useState } from 'react'
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
    setTitle(e.target.value);
  }
  const handleSubmit = () => {
    let content = editor.getHTML();
    let blogData = {
      title: title,
      content: content,
      author: "Mukesh Maurya"
    };
    console.log(blogData)
  };

  //   useEffect(()=> {
  // fetch("http://localhost:5000/api/blogs", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     title: "My new blog",
  //     content: "Here’s what I learned...",
  //     author: "Mukesh Maurya"
  //   }),
  // })
  //   .then(res => res.json())
  //   .then(data => console.log("Blog created:", data))
  //   .catch(err => console.error("Error:", err));
  //   }, []);

  return (
    <div className='writeblog-wrapper'>
      <h3 className='text-center'>Create a New Blog Post</h3>

      <div className="editor-container">
        <div className='title-wrap'>
          <label for="title">Title:</label>
          <input onChange={handleTitle}
            type="text" id="title" name="title" placeholder="Enter your Blog Title" />
        </div>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} className="editor-content" />
        <button className="btn btn-primary right submit" type='button' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}
