import { fn, expect, within, userEvent } from 'storybook/test'
import preview from '#.storybook/preview'
import { Button } from './Button'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import DownloadIcon from '@mui/icons-material/Download'
import ShareIcon from '@mui/icons-material/Share'

const meta = preview.meta({
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    chromatic: {
      viewports: [375, 768, 1280, 1920],
    },
  },
  args: {
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'link', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right', 'only'],
    },
  },
})

export default meta

/**
 * Comprehensive showcase of all button variants, sizes, and icon combinations.
 * This demonstrates the full range of visual styles available.
 */
export const Showcase = meta.story({
  render: () => (
    <div className="space-y-12 p-8">
      {/* Variants */}
      <section>
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Variants</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm" variant="primary">
            Small
          </Button>
          <Button size="md" variant="primary">
            Medium
          </Button>
          <Button size="lg" variant="primary">
            Large
          </Button>
          <Button size="icon" icon={<AddIcon />} variant="primary" aria-label="Add" />
        </div>
      </section>

      {/* Icons */}
      <section>
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Icons</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button icon={<AddIcon />} iconPosition="left" variant="primary">
            Add Item
          </Button>
          <Button icon={<ArrowForwardIcon />} iconPosition="right" variant="primary">
            Continue
          </Button>
          <Button icon={<SaveIcon />} iconPosition="only" variant="primary" aria-label="Save" />
          <Button icon={<EditIcon />} iconPosition="left" variant="secondary">
            Edit
          </Button>
          <Button icon={<DeleteIcon />} iconPosition="left" variant="destructive">
            Delete
          </Button>
        </div>
      </section>

      {/* Variants with Icons */}
      <section>
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Variants with Icons</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button icon={<AddIcon />} iconPosition="left" variant="primary">
            Primary
          </Button>
          <Button icon={<AddIcon />} iconPosition="left" variant="secondary">
            Secondary
          </Button>
          <Button icon={<AddIcon />} iconPosition="left" variant="outline">
            Outline
          </Button>
          <Button icon={<AddIcon />} iconPosition="left" variant="ghost">
            Ghost
          </Button>
          <Button icon={<AddIcon />} iconPosition="left" variant="destructive">
            Destructive
          </Button>
        </div>
      </section>

      {/* All Sizes per Variant */}
      <section>
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Size Variants</h3>
        <div className="space-y-6">
          {(['primary', 'secondary', 'outline', 'ghost'] as const).map((variant) => (
            <div key={variant}>
              <h4 className="text-sm font-medium mb-2 capitalize dark:text-gray-300">{variant}</h4>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm" variant={variant}>
                  Small
                </Button>
                <Button size="md" variant={variant}>
                  Medium
                </Button>
                <Button size="lg" variant={variant}>
                  Large
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
})

/**
 * Demonstrates all interactive states: loading, disabled, and normal interaction.
 * Also shows buttons used as links and dark mode support.
 */
export const StatesAndInteractions = meta.story({
  render: () => (
    <div className="space-y-12 p-8">
      {/* Loading States */}
      <section>
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Loading States</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button loading variant="primary">
            Loading
          </Button>
          <Button loading variant="secondary">
            Loading
          </Button>
          <Button loading variant="outline">
            Loading
          </Button>
          <Button loading icon={<SaveIcon />} iconPosition="left" variant="primary">
            Saving
          </Button>
          <Button loading size="icon" icon={<SaveIcon />} variant="primary" aria-label="Saving" />
        </div>
      </section>

      {/* Disabled States */}
      <section>
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Disabled States</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button disabled variant="primary">
            Disabled
          </Button>
          <Button disabled variant="secondary">
            Disabled
          </Button>
          <Button disabled variant="outline">
            Disabled
          </Button>
          <Button disabled variant="ghost">
            Disabled
          </Button>
          <Button disabled variant="destructive">
            Disabled
          </Button>
          <Button disabled icon={<DeleteIcon />} iconPosition="left" variant="destructive">
            Disabled
          </Button>
        </div>
      </section>

      {/* As Links */}
      <section>
        <h3 className="text-lg font-semibold mb-4 dark:text-white">As Links</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button as="a" href="#" variant="primary">
            Primary Link
          </Button>
          <Button as="a" href="#" variant="secondary">
            Secondary Link
          </Button>
          <Button as="a" href="#" variant="outline">
            Outline Link
          </Button>
          <Button as="a" href="#" variant="link">
            Text Link
          </Button>
        </div>
      </section>

      {/* Interactive Example */}
      <section>
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Interactive</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary" onClick={fn()}>
            Click me
          </Button>
          <Button variant="secondary" onClick={fn()} icon={<AddIcon />} iconPosition="left">
            Add Item
          </Button>
          <Button variant="outline" onClick={fn()} icon={<ArrowForwardIcon />} iconPosition="right">
            Continue
          </Button>
        </div>
      </section>

      {/* Dark Mode */}
      <section>
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Dark Mode Support</h3>
        <div className="p-6 bg-gray-900 rounded-lg">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </div>
      </section>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Click me' })
    await userEvent.click(button)
    await expect(button).toBeEnabled()
  },
})

/**
 * Real-world usage examples showing buttons in common scenarios:
 * forms, action bars, navigation, and feature highlights.
 */
export const UseCases = meta.story({
  render: () => (
    <div className="space-y-12 p-8">
      {/* Form Actions */}
      <section>
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Form Actions</h3>
        <div className="max-w-md space-y-4 p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="space-y-2">
            <label className="block text-sm font-medium dark:text-white">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" onClick={fn()}>
              Cancel
            </Button>
            <Button variant="primary" onClick={fn()} icon={<SaveIcon />} iconPosition="left">
              Save Changes
            </Button>
          </div>
        </div>
      </section>

      {/* Action Bar */}
      <section>
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Action Bar</h3>
        <div className="flex flex-wrap items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Button variant="primary" size="sm" icon={<AddIcon />} iconPosition="left">
            Create
          </Button>
          <Button variant="outline" size="sm" icon={<EditIcon />} iconPosition="left">
            Edit
          </Button>
          <Button variant="outline" size="sm" icon={<DownloadIcon />} iconPosition="left">
            Download
          </Button>
          <Button variant="outline" size="sm" icon={<ShareIcon />} iconPosition="left">
            Share
          </Button>
          <div className="ml-auto">
            <Button variant="destructive" size="sm" icon={<DeleteIcon />} iconPosition="left">
              Delete
            </Button>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section>
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Navigation</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button as="a" href="#" variant="link">
            Home
          </Button>
          <Button as="a" href="#" variant="link">
            About
          </Button>
          <Button as="a" href="#" variant="link">
            Services
          </Button>
          <Button as="a" href="#" variant="link">
            Contact
          </Button>
          <div className="ml-auto">
            <Button as="a" href="#" variant="primary" size="sm">
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Highlight */}
      <section>
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Feature Highlight</h3>
        <div className="max-w-2xl p-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white">
          <h4 className="text-2xl font-bold mb-2">Get Started Today</h4>
          <p className="mb-6 text-indigo-100">
            Join thousands of users who are already using our platform to achieve their goals.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" size="lg" onClick={fn()} icon={<ArrowForwardIcon />} iconPosition="right">
              Start Free Trial
            </Button>
            <Button variant="ghost" size="lg" onClick={fn()}>
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Icon-Only Actions */}
      <section>
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Icon-Only Actions</h3>
        <div className="flex items-center gap-3">
          <Button size="icon" icon={<EditIcon />} variant="ghost" aria-label="Edit" />
          <Button size="icon" icon={<ShareIcon />} variant="ghost" aria-label="Share" />
          <Button size="icon" icon={<DownloadIcon />} variant="ghost" aria-label="Download" />
          <Button size="icon" icon={<DeleteIcon />} variant="ghost" aria-label="Delete" />
          <Button size="icon" icon={<AddIcon />} variant="primary" aria-label="Add" />
        </div>
      </section>

      {/* Loading in Context */}
      <section>
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Loading in Context</h3>
        <div className="max-w-md space-y-4">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium dark:text-white">Processing payment...</span>
              <Button loading size="sm" variant="primary">
                Processing
              </Button>
            </div>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium dark:text-white">Ready to submit</span>
              <Button size="sm" variant="primary" icon={<ArrowForwardIcon />} iconPosition="right">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  ),
})
