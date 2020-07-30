import React from 'react';
import 'antd/dist/antd.css';
import { Select } from 'antd';
import { inject, observer } from 'mobx-react'
class SelectTheme extends React.Component {

  render () {
    const { Option } = Select;
    let { startingStore: { listOfCategories, listOfStyles } } = this.props;

    let theme = [];
    let style = [];
    let categoryList = listOfCategories.map(cat => cat.catType)
    let styleList = listOfStyles.map(style => style.styleType)
    let themelist = categoryList.map((thm, i) => {
      theme.push(<Option key={thm}>{thm}</Option>);
    })
    let stylelist = styleList.map((sty, i) => {
      style.push(<Option key={sty}>{sty}</Option>);
    })

    function handleChange (value) {
      console.log(`selected ${value}`);
    }



    function handleChange (value) {
      console.log(`selected ${value}`);
    }

    return (
      <div className="clearfix">
        <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Select Theme"
          // onChange={artTheme => artwork.setProperty("artTheme", artTheme.target.value)}
          className="antselect"
        >
          {theme}
        </Select>

        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Select Style"
          // onChange={artStyle => artwork.setProperty("artStyle", artStyle.target.value)}
          className="antselect"
        >
          {style}
        </Select>
      </div>
    );
  }
}

export default inject("startingStore")(observer(SelectTheme));