import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'
import {
  Form, Icon, Input, Button, Checkbox, Spin,
} from 'antd'
import './view.less'

class User extends Component {
  componentDidMount() {
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const { form } = this.props
    form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        const { actions } = this.props
        try {
          actions.request({
            username: values.username,
            password: values.password,
          })
        } catch (error) {
        }
      }
    })
  }

  render() {
    const {
      isLogin, processing, msg, form,
    } = this.props
    const { getFieldDecorator } = form
    if (isLogin) {
      return (<Redirect to='/user/me' />)
    }
    return (
      <Spin tip='logining...' spinning={processing}>
        <Form onSubmit={this.handleSubmit} className='login-form'>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Username' />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Password' />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住我</Checkbox>,
            )}
            <a className='login-form-forgot' href='/'>忘记密码</a>
            <Button type='primary' htmlType='submit' className='login-form-button'>
              登录
            </Button>
            Or <a href='////'>马上注册！</a>

          </Form.Item>
          <p className='remind'>{msg}</p>
        </Form>
      </Spin>
    )
  }
}

User.propTypes = {
  form: PropTypes.object.isRequired,
  processing: PropTypes.bool.isRequired,
  isLogin: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  msg: PropTypes.string.isRequired,
}

const userForm = Form.create({ name: 'normal_login' })(User)
export default userForm
