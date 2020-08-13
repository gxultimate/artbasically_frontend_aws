import React from 'react';
import ImageUploader from 'react-images-upload';

class UploadID extends React.Component {

  constructor(props) {
        super(props);
         this.state = { pictures: [] };
         this.onDrop = this.onDrop.bind(this);
    }
 
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }
 
    render() {
        return (
            <ImageUploader
                withIcon={true}
                buttonText='Upload Image'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.jpeg']}
                maxFileSize={5242880}
                label='Max file size: 50mb, accepted: jpg, jpeg'
                fileTypeError="File is not supported"
                singleImage={true}
            />
        );
    }
}

export default UploadID;