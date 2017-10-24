import React from 'react'
import MSField from './msField'
import { preprocessValueOnChange, preprocessValueRender } from './msField'

const Control = function (props) {
  return <span value={props.value}>{props.children}</span>
}



test('msField date with number input', () => {
  let f = new MSField({name:"f1", value:"v", text:"t", type: 'date'})
  let value = preprocessValueRender(f, 0)
  expect(value).toBe('1970-01-01');

  let value2 = preprocessValueOnChange(f, '1970-01-02')
  expect(value2).toBe(86400000);
});

test('msField date with string input', () => {
  let f = new MSField({name:"f1", value:"v", text:"t", type: 'date'})
  let value = preprocessValueRender(f, '1970-01-02')
  expect(value).toBe('1970-01-02');

  let value2 = preprocessValueOnChange(f, '1970-01-01')
  expect(value2).toBe(0);
});

test('msField with empty string with null', () => {
  let f = new MSField({name:"f1", value:"v", text:"t", type: 'date'})
  let value = preprocessValueRender(f, null)
  expect(value).toBe("");

  let value2 = preprocessValueOnChange(f, '1970-01-01')
  expect(value2).toBe(0);
});

test('msField with empty string with empty string', () => {
  let f = new MSField({name:"f1", value:"v", text:"t", type: 'date'})
  let value = preprocessValueRender(f, '')
  expect(value).toBe("");

  let value2 = preprocessValueOnChange(f, '1970-01-01')
  expect(value2).toBe(0);
});

test('msField with empty string with flag to work as String', () => {
  let f = new MSField({name:"f1", value:"v", text:"t", type: 'date', dateAsString: true})
  let value = preprocessValueRender(f, '1970-01-01')
  expect(value).toBe('1970-01-01');

  let value2 = preprocessValueOnChange(f, '1970-01-02')
  expect(value2).toBe('1970-01-02');
});