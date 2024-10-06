import { PropTypes } from 'prop-types';
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor({ quillValue, handleChangeQuill }) {
  return (
    <ReactQuill theme="snow" value={quillValue} onChange={handleChangeQuill} />
  );
}
Editor.propTypes = {
  quillValue: PropTypes.string,
  handleChangeQuill: PropTypes.func,
};
export default Editor;
