import LightboxComponent, {
    LightboxExternalProps,
  } from "yet-another-react-lightbox";
  import "yet-another-react-lightbox/plugins/thumbnails.css";
  import "yet-another-react-lightbox/styles.css";
  import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
  export default function Lightbox(
    props: Omit<LightboxExternalProps, "plugins">
  ) {
    return (
      <LightboxComponent
        {...props}
       
      />
    );
  }
  