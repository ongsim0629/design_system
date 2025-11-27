import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '../components/organisms/Modal';
import { Button } from '../components/ui/button';
import { FormInput } from '../components/molecules/FormInput';
import { useState } from 'react';

const meta = {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '모달 크기',
    },
    showFooter: {
      control: 'boolean',
      description: 'Footer 표시 여부',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const ModalWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const Small: Story = {
  render: () => (
    <ModalWrapper
      title="Small Modal"
      size="small"
    >
      <p>This is a small modal with minimal content.</p>
    </ModalWrapper>
  ),
};

export const Medium: Story = {
  render: () => (
    <ModalWrapper
      title="Medium Modal"
      size="medium"
    >
      <p>This is a medium-sized modal with some content.</p>
      <p>It can contain multiple paragraphs and elements.</p>
    </ModalWrapper>
  ),
};

export const Large: Story = {
  render: () => (
    <ModalWrapper
      title="Large Modal"
      size="large"
    >
      <p>This is a large modal suitable for forms or detailed content.</p>
      <FormInput
        name="example"
        label="Example Field"
        placeholder="Enter something"
      />
    </ModalWrapper>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <ModalWrapper
      title="Modal with Footer"
      size="medium"
      showFooter
      footerContent={
        <>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Confirm</Button>
        </>
      }
    >
      <p>This modal has a footer with action buttons.</p>
    </ModalWrapper>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <ModalWrapper
      title="Create New User"
      description="Fill in the information below to create a new user account"
      size="medium"
      showFooter
      footerContent={
        <>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Create</Button>
        </>
      }
    >
      <div className="space-y-4">
        <FormInput
          name="username"
          label="Username"
          placeholder="Enter username"
          required
        />
        <FormInput
          name="email"
          label="Email"
          type="email"
          placeholder="user@example.com"
          required
        />
      </div>
    </ModalWrapper>
  ),
};

export const FormModal: Story = {
  render: () => (
    <ModalWrapper
      title="User Information"
      size="large"
      showFooter
      footerContent={
        <>
          <Button variant="secondary">Cancel</Button>
          <Button variant="success">Save</Button>
        </>
      }
    >
      <div className="space-y-4">
        <FormInput
          name="name"
          label="Full Name"
          placeholder="John Doe"
          required
        />
        <FormInput
          name="email"
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          required
        />
        <FormInput
          name="phone"
          label="Phone Number"
          placeholder="+82 10-1234-5678"
        />
      </div>
    </ModalWrapper>
  ),
};

export const ConfirmationModal: Story = {
  render: () => (
    <ModalWrapper
      title="Confirm Deletion"
      size="small"
      showFooter
      footerContent={
        <>
          <Button variant="secondary">Cancel</Button>
          <Button variant="danger">Delete</Button>
        </>
      }
    >
      <p>Are you sure you want to delete this item?</p>
      <p className="text-sm text-muted-foreground mt-2">This action cannot be undone.</p>
    </ModalWrapper>
  ),
};
