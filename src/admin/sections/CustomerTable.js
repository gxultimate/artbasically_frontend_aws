import React, {Component} from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBRow,
  MDBCol,
} from 'mdbreact';
import {inject, observer} from 'mobx-react';
import EditAcc from './EditAcc';

class CustomerTable extends Component {
  componentDidMount() {
    let {
      startingStore: {getArtworkInfo, getAccounts, getStyles, getCategories},
    } = this.props;
    getAccounts();
    getArtworkInfo();
    getStyles();
    getCategories();
  }

  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  checkList = (id) => {
    let src = '';
    let imgsrc = this.state.img.filter((img) => {
      if (img[1][0] === id) {
        src += img[0];
      }
    });
    console.log(this.state.img, 'sdsdsds');
    return src;
  };

  // executeOnClick (isExpanded) {
  //   console.log(isExpanded);
  // }

  render() {
    let {
      startingStore: {listOfUsers},
    } = this.props;
    let listOfCustomers = listOfUsers.filter((artist) => {
      if (artist.accessType === 'Standard') {
        return artist;
      }
    });

    function themeType(array) {
      let arrayList = '';
      array.map((theme) => {
        if (theme !== '' && array.length > 1) {
          arrayList += `${theme}, `;
        } else if (array.length === 1 && array[0] !== '') {
          arrayList += `${theme}`;
        } else {
          arrayList += 'No Categories Selected';
        }
      });
      return arrayList;
    }

    return (
      <MDBRow className='mb-4'>
        <MDBCol md='12'>
          <MDBCard>
            <MDBCardBody>
              <h3>Customer List</h3>
              <MDBTable hover className='tablescroll'>
                <MDBTableHead color='blue-grey lighten-4'>
                  <tr>
                   
                  
                
                  <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Address</th>
                    <th>Contact Number</th>
                    <th>Address</th>
                 
                    <th>Action</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {listOfCustomers.reverse().map((data) => (
                    <tr>
                    
                      
                  
                    <td>{data.accID}</td>
                      <td>{data.accFname}</td>
                      <td>{data.accLname}</td>
                      <td>{data.accEmailAddress}</td>
                      <td>{data.accContact}</td>
                      <td>{data.accAddress}</td>
                      
                      <td>
                        <EditAcc data={data} />
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    );
  }
}

export default inject('startingStore')(observer(CustomerTable));
