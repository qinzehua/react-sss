import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Form, FormItem } from './'
import { Input } from '../Input'
import { Button } from '../Button'

import { useState } from 'react'

const meta = {
  title: 'Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Form>

export default meta

type Story = StoryObj<typeof meta>

export const Default = () => {
  return (
    <Form name="form" initailValues={{ username: 'qzh', agreement: true }}>
      <FormItem
        label="Username"
        name="username"
        rules={[
          {
            type: 'email',
            required: true,
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
        >
          <Input type="checkbox" />
        </FormItem>
        <span className="agreement-text">
          I agree to the <a href="#">terms and conditions</a>
        </span>
      </div>
      <div className="form-submit-area">
        <Button btnType="primary" size="lg">
          Submit
        </Button>
      </div>
    </Form>
  )
}