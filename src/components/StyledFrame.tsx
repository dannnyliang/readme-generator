import {
  FC,
  RefObject,
  createRef,
  useContext,
  useEffect,
  useState,
} from "react";
import Frame, {
  FrameComponentProps,
  FrameContext,
} from "react-frame-component";
import { StyleSheetManager, createGlobalStyle } from "styled-components";

const InjectFrameStyles: FC = (props) => {
  const { document } = useContext(FrameContext);
  return (
    <StyleSheetManager target={document.head}>
      {props.children}
    </StyleSheetManager>
  );
};

const CSSReset = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const StyledFrame: FC<FrameComponentProps> = (props) => {
  const { children, ...otherProps } = props;

  const [height, setHeight] = useState(1000);
  const iframeRef = createRef<Frame>();
  const handleResize = (iframe: RefObject<Frame>) => {
    if (
      iframe.current &&
      // @ts-ignore
      iframe.current.node.contentDocument &&
      // @ts-ignore
      iframe.current.node.contentDocument.body.scrollHeight !== 0
    ) {
      // @ts-ignore
      setHeight(iframe.current.node.contentDocument.body.scrollHeight);
    }
  };

  useEffect(() => {
    handleResize(iframeRef);
  }, [children, iframeRef]);

  return (
    <Frame
      initialContent={
        '<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>'
      }
      style={{ height }}
      ref={iframeRef}
      onLoad={() => handleResize(iframeRef)}
      {...otherProps}
    >
      <InjectFrameStyles>
        <>
          <CSSReset />
          {children}
        </>
      </InjectFrameStyles>
    </Frame>
  );
};

export default StyledFrame;
