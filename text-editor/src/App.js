import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./style.less";
import { readFileAsDataUrl } from "./utils";

function App() {
  const [html, setHtml] = useState("");

  const selectedImgRef = useRef(null);

  const execCommand = useCallback((name, args = null) => {
    document.execCommand(name, false, args);
  });

  const handleBold = useCallback(() => {
    execCommand("bold");
  }, []);

  const handleItalic = useCallback(() => {
    execCommand("italic");
  }, []);

  const handleUnderline = useCallback(() => {
    execCommand("underline");
  }, []);

  const handleFormatBlock = useCallback((block = "<p>") => {
    execCommand("formatblock", block);
  }, []);

  const handleAddLink = useCallback(() => {
    let url = window.prompt("请输入链接地址", "https://baidu.com");
    if (!url) {
      return;
    }
    execCommand("createLink", url);
  }, []);

  const handleEditorChange = useCallback((e) => {
    const element = e.target;
    setHtml(element.innerHTML);
  }, []);

  const handleInsertImage = useCallback(async (e) => {
    const target = e.target;
    if (!target) {
      return;
    }
    const file = target.files[0];
    const base64Img = await readFileAsDataUrl(file);
    execCommand("insertImage", base64Img);
    target.value = ""; // 解决同一张图片上传无效的问题
  }, []);

  const imgTagHandler = useCallback((target) => {
    selectedImgRef.current = target;
    target.classList.add("selected");
  }, []);

  const htmlTagHandlerMap = useMemo(() => {
    return {
      img: imgTagHandler,
    };
  }, [imgTagHandler]);

  const clearImgSelected = useCallback(() => {
    const selectedImg = selectedImgRef.current;
    if (!selectedImg) return;
    selectedImg.classList.remove("selected");
  }, []);

  const clearSelected = useCallback(() => {
    clearImgSelected();
  }, []);

  const handleEditorClick = useCallback(
    (e) => {
      clearSelected();
      const target = e.target;
      const tagName = target.tagName?.toLocaleLowerCase();
      const handler = htmlTagHandlerMap[tagName];
      handler && handler(target);
    },
    [htmlTagHandlerMap]
  );

  return (
    <div>
      <h1>editor</h1>
      <div className="nav">
        <button onClick={handleBold}>bold</button>
        <button onClick={handleItalic}>italic</button>
        <button onClick={handleUnderline}>underline</button>
        <button className="image">
          insert image
          <input
            type="file"
            accept="image/gif, image/jpeg, image/png"
            className="file-image"
            onChange={handleInsertImage}
          ></input>
        </button>
        <button onClick={handleAddLink}>add link</button>
        <button onClick={() => handleFormatBlock("<p>")}>P</button>
        <button onClick={() => handleFormatBlock("<h1>")}>H1</button>
      </div>
      <div
        onClick={handleEditorClick}
        contentEditable
        className="editor"
        onInput={handleEditorChange}
      ></div>
      <h1>html content</h1>
      <div>{html}</div>
    </div>
  );
}

export default App;
