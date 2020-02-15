import React, { useCallback, useState } from "react";
import Editor from "@monaco-editor/react";
import { FORM_FIELD_CLASSNAME } from "../../constants";
import PageBuilder from "../../PageBuilder/PageBuilder";
import parseXmlConfig from "../../ConfigurationProvider/parseXmlConfig";
import Button from "../Button/Button";
import "./Editor.css";

const DEFAULT_EDITOR_VALUE = `<Page>
  <Label caption="Use the editor at the bottom of this page to dynamically edit it!" />
  <Label caption="Click the 'Update' button when you are done." />

  <Label caption="Sample text input:" />
  <TextInput />

  <ButtonRow>
    <Button caption="Sample button" />
    <Button caption="Right aligned button" rightAligned="true" />
  </ButtonRow>
</Page>`;

const MONACO_OPTIONS = {
  minimap: {
    enabled: false
  }
};

export default function TextArea(props) {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [getEditorValue, setEditorValueGetter] = useState(() => () =>
    DEFAULT_EDITOR_VALUE
  );
  const [parsedEditorValue, setParsedEditorValue] = useState(
    memoizedParser(DEFAULT_EDITOR_VALUE)
  );

  const handleEditorDidMount = useCallback(valueGetter => {
    setIsEditorReady(true);
    setEditorValueGetter(() => valueGetter);
  }, []);

  const onUpdateButtonClick = useCallback(() => {
    setParsedEditorValue(memoizedParser(getEditorValue()));
  }, [getEditorValue]);

  return (
    <>
      <PageBuilder configuration={parsedEditorValue} />
      <Button
        className="editor-button"
        caption="Update page with configuration from editor"
        hidden={!isEditorReady}
        onClick={onUpdateButtonClick}
      />
      <div className={`${FORM_FIELD_CLASSNAME} editor`}>
        <Editor
          height="400px"
          language="xml"
          value={DEFAULT_EDITOR_VALUE}
          options={MONACO_OPTIONS}
          editorDidMount={handleEditorDidMount}
        />
      </div>
    </>
  );
}

const memoMapForParser = Object.create(null);
function memoizedParser(xml) {
  if (memoMapForParser[xml]) return memoMapForParser[xml];
  memoMapForParser[xml] = parseXmlConfig(xml);
  return memoMapForParser[xml];
}
