// import React, { Component } from 'react';
// import { FormGroup, FormControl, HelpBlock, ControlLabel } from 'react-bootstrap';
// import Dropzone from 'react-dropzone'

// const filesArray = [];

// const renderDropzoneInput = ({name, input, meta}) => {
//   return (
//     <div>
//         <Dropzone
//           name={name}
//           multiple={true}
//           onDrop={( filesToUpload, e ) => {
//             filesArray.push(filesToUpload[0]);
//             input.onChange(filesArray);
//             console.log('FILESTOUPLOAD', input)
//           }}
//         >
//           <div>Try dropping some files here, or click to select files to upload.</div>
//         </Dropzone>
//         {meta.touched &&
//           meta.error &&
//           <span className="error">{meta.error}</span>
//         }
//         {input.value && Array.isArray(input.value) && (
//           <ul>
//             { input.value.map((file, i) => <img key={i} src={file.preview} />) }
//           </ul>
//         )}
//     </div>
//   );
// }

// export default renderDropzoneInput;
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';
import { Glyphicon } from 'react-bootstrap'

const style = {
    borderWidth: 2,
    borderColor: '#0189a9',
    borderStyle: 'solid',
    borderRadius: 4,
    margin: 30,
    padding: 30,
    transition: 'all 0.5s',
    color: '#0189a9'
};

const activeStyle = {
    borderStyle: 'solid',
    borderColor: '#4FC47F'
};

const rejectStyle = {
    borderStyle: 'solid',
    borderColor: '#DD3A0A'
};


class renderDropzoneInput extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            files: []
        };
    }

    onDrop(files) {
        console.log('Received files: ', files);
        const filesArray = this.state.files.concat(files[0])
        this.setState({
            files: filesArray
        });
    }

    showFiles() {
        const { files } = this.state;

        if (!files.length) {
            return null;
        }

        return (
            <div>
                <ul>
                    {
                        files.map((file, idx) => {
                            return (
                                <li key={idx}>
                                    <img src={file.preview} width={100}/>
                                    <div>{file.name + ' : ' + file.size + ' bytes.'}</div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }

    render() {
        const { label, glyphName } = this.props;
        return (
            <div>
                <Dropzone onDrop={this.onDrop.bind(this)}
                          accept="image/*"
                          style={style}
                          activeStyle={activeStyle}
                          rejectStyle={rejectStyle}
                >
                <Glyphicon glyph={glyphName} /> { label }
                </Dropzone>
                {this.showFiles()}
            </div>
        );
    }
}

export default renderDropzoneInput;