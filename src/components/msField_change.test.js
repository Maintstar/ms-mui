import React from 'react'
import MSField from './msField'
import renderer from 'react-test-renderer';

const testOptions = [
  {id:'1', name: 'name1', descr: 'descr1' },
  {id:'2', name: 'name2', descr: 'descr2' },
  {id:'3', name: 'name3', descr: 'descr3' },
  {id:'4', name: 'name4', descr: 'descr4' }
]

function renderJson(c) {
  return renderer.create(c).toJSON()
}

/*

 1. + msField
 2. - msField [options]                  - allow to select proper value only, selects idCol   to value
 3. - msField [options, isFree]          - allow to enter whatever allowed,   select  nameCol to value
 4. - msField [options, isMulti]         - allow to enter whatever allowed,   select  nameCol to value
 5. - msField [options, isFree, isMulti] - allow to enter whatever allowed several times

 */

const Control = function (props) {
  return <span value={props.value}>{props.children}</span>
}



test('msField', () => {
  let f = new MSField({name:"f1", value:"v", text:"t"})

  //console.log(f.render())
  expect(f.props.value).toBe('v');
  expect(f.props.text).toBe('t');
});
