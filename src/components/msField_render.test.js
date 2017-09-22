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
  let f2 = renderJson(<MSField name="f1" value={"v"} text={"t"} />)
  let i = f2.children[0]
  expect(i.props.value).toBe('v');
  expect(i.props.text).toBe(undefined);
});

test('msField [options, value="2"]', () => {
  let f2 = renderJson(<MSField name="f1" options={testOptions} value="2" />)
  let i = f2.children[0]

  expect(i.props.value).toBe('name2');
});

test('msField [options value="2" text="33"]', () => {
  let f2 = renderJson(<MSField name="f1" options={testOptions} value="2" text="33" />)
  let i = f2.children[0]

  expect(i.props.value).toBe('33');
});
test('msField [options text="33"]', () => {
  let f2 = renderJson(<MSField name="f1" options={testOptions} text="33" />)
  let i = f2.children[0]

  expect(i.props.value).toBe('33');
});

test('msField [options, isFree, value="2"]', () => {
  let f2 = renderJson(<MSField name="f1" options={testOptions} isFree={true} value="2" />)
  let i = f2.children[0]

  expect(i.props.value).toBe('2');
});

test('msField [options, isMulti, value="2"]', () => {
  let f2 = renderJson(<MSField name="f1" options={testOptions} isMulti={true} value="2" />)
  let i = f2.children[1]

  expect(i.props.value).toBe('');
});

xtest('msField [options, isFree, isMulti, value="2"]', () => {
  let f2 = renderJson(<MSField name="f1" options={testOptions} isFree={true} isMulti={true} value="2" />)
  let i = f2.children[0]

  expect(i.props.value).toBe('');
});


test('msField empty', () => {
  let f2 = renderJson(<MSField name="f1" />)
  let i = f2.children[0]
  expect(i.props.value).toBe(undefined);
  expect(i.props.text).toBe(undefined);
});

test('msField [options] empty', () => {
  let f2 = renderJson(<MSField name="f1" options={testOptions} />)
  let i = f2.children[0]

  expect(i.props.value).toBe(undefined);
  expect(i.props.text).toBe(undefined);
});

test('msField empty2', () => {
  let f2 = renderJson(<MSField name="f1" value="" text="1" />)
  let i = f2.children[0]

  //console.log(i)
  expect(i.props.value).toBe("");
});