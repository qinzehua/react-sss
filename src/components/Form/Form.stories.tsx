import type { Meta } from '@storybook/react'
import { Form, FormItem, IFormRefProps } from './'
import { Input } from '../Input'
import { Button } from '../Button'
import { useRef } from 'react'

const meta = {
  title: 'Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Form>

export default meta

export const Default = () => {
  const ref = useRef<IFormRefProps>(null)

  const resetAll = () => {
    console.log('get username', ref.current?.getFieldValue('username'))
    ref.current?.resetFields()
    console.log('get username', ref.current?.getFieldValue('username'))
  }

  return (
    <Form name="form" initailValues={{ username: 'qzh' }} ref={ref}>
      {({ isSubmitting, isValidate }) => (
        <>
          <FormItem
            require
            label="Username"
            name="username"
            rules={[
              {
                type: 'email',
              },
            ]}
          >
            <Input type="text" />
          </FormItem>
          <FormItem
            label="Password"
            name="password"
            rules={[
              {
                type: 'string',
                required: true,
                min: 3,
                max: 8,
              },
            ]}
          >
            <Input type="password" />
          </FormItem>
          <FormItem
            label="Confirm Password"
            name="confirm_password"
            rules={[
              ({ getFieldValue }) => ({
                asyncValidator: async (rule, value) => {
                  return new Promise((resolve, reject) => {
                    if (value !== getFieldValue('password')) {
                      setTimeout(() => {
                        reject('Password not match')
                      }, 1000)
                    } else {
                      setTimeout(() => {
                        resolve()
                      }, 1000)
                    }
                  })
                },
                message: 'Password not match',
              }),
            ]}
          >
            <Input type="password" />
          </FormItem>
          <div
            className="agreement-section"
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'bottom',
              gap: '8px',
            }}
          >
            <FormItem
              name="agreement"
              valuePropsName="checked"
              getValueFromEvent={(e) => e.target.checked}
              rules={[
                {
                  type: 'enum',
                  enum: [true],
                },
              ]}
            >
              <Input type="checkbox" />
            </FormItem>
            <span className="agreement-text">
              I agree to the <a href="https://baidu.com">terms and conditions</a>
            </span>
          </div>
          <div className="form-submit-area">
            <Button type="submit" btnType="primary" size="lg">
              Submit {isSubmitting ? '提交中.....' : '已提交'}{' '}
              {isValidate ? '验证成功' : '验证失败'}
            </Button>
            <Button type="button" btnType="danger" size="lg" onClick={resetAll}>
              Reset
            </Button>
          </div>
        </>
      )}
    </Form>
  )
}
