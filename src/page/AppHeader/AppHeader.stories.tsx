import type { ComponentProps } from 'react'
import preview from '#.storybook/preview'
import { AppHeader } from './AppHeader'
import { fn } from 'storybook/test'

const meta = preview.meta({
  title: 'Page/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    showMenuButton: {
      description: 'Show menu button for sidebar toggle',
      control: 'boolean',
    },
    showThemeToggle: {
      description: 'Show theme toggle',
      control: 'boolean',
    },
    showSearch: {
      description: 'Show search form',
      control: 'boolean',
    },
    showNotifications: {
      description: 'Show notifications',
      control: 'boolean',
    },
    showProfile: {
      description: 'Show profile menu',
      control: 'boolean',
    },
    showLogin: {
      description: 'Show login button',
      control: 'boolean',
    },
  },
})

export default meta

export const Default = meta.story({
  args: {
    onMenuClick: fn(),
    searchProps: {
      onSearch: fn(),
    },
  },
  render: (args: ComponentProps<typeof AppHeader>) => <AppHeader {...args} />,
})

export const WithAuthenticatedUser = meta.story({
  args: {
    showMenuButton: true,
    showThemeToggle: true,
    showSearch: true,
    showNotifications: true,
    showProfile: true,
    showLogin: false,
    notifications: {
      count: 4,
      items: [
        {
          id: '1',
          title: 'Sara Salah',
          message: 'replied on the Upload Image article',
          time: '2 minutes ago',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop',
        },
        {
          id: '2',
          title: 'Slick Net',
          message: 'started following you',
          time: '45 minutes ago',
          avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=64&h=64&fit=crop',
        },
      ],
      seeAllHref: '/notifications',
    },
    profile: {
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop',
      name: 'John Doe',
      email: 'john@example.com',
      menuItems: [
        { name: 'Your Profile', href: '/profile', icon: '👤' },
        { name: 'Settings', href: '/settings', icon: '⚙️' },
        { name: 'Sign out', onClick: fn(), icon: '🚪' },
      ],
    },
  },
})

export const WithoutAuthentication = meta.story({
  args: {
    showMenuButton: false,
    showThemeToggle: true,
    showSearch: true,
    showNotifications: false,
    showProfile: false,
    showLogin: true,
    loginButton: {
      href: '/auth/login',
      label: 'Log in',
    },
  },
})

export const Minimal = meta.story({
  args: {
    showMenuButton: true,
    showThemeToggle: false,
    showSearch: false,
    showNotifications: false,
    showProfile: false,
    showLogin: false,
  },
})

export const WithSecondMenu = meta.story({
  args: {
    showMenuButton: true,
    showThemeToggle: true,
    showSecondMenu: true,
    secondMenuItems: [
      {
        name: 'Pricing',
        description: 'View our pricing plans',
        href: '/pricing',
      },
      {
        name: 'Contact',
        description: 'Get in touch with us',
        href: '/contact',
      },
      {
        name: 'Reports',
        description: 'View analytics and reports',
        href: '/reports',
      },
    ],
    showSearch: true,
    showNotifications: true,
    showProfile: true,
  },
})

export const CustomBrand = meta.story({
  args: {
    brand: {
      name: 'My App',
      logo: (
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          <span className="text-indigo-600 font-bold text-sm">MA</span>
        </div>
      ),
      href: '/',
    },
  },
})

export const WithNavigation = meta.story({
  args: {
    showMenuButton: true,
    navigation: [
      { name: 'Dashboard', href: '#', current: true },
      { name: 'Team', href: '#', current: false },
      { name: 'Projects', href: '#', current: false },
      { name: 'Calendar', href: '#', current: false },
    ],
    showThemeToggle: true,
    showSearch: true,
    showNotifications: true,
    showProfile: true,
    notifications: {
      count: 3,
    },
    profile: {
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop',
      name: 'John Doe',
      email: 'john@example.com',
      menuItems: [
        { name: 'Your Profile', href: '/profile' },
        { name: 'Settings', href: '/settings' },
        { name: 'Sign out', onClick: fn() },
      ],
    },
  },
})

export const MobileView = meta.story({
  args: {
    navigation: [
      { name: 'Dashboard', href: '#', current: true },
      { name: 'Team', href: '#', current: false },
      { name: 'Projects', href: '#', current: false },
    ],
    showMenuButton: false, // Navigation menu handles mobile menu
    showThemeToggle: false, // Hidden on mobile
    showSearch: false, // Hidden on mobile
    showNotifications: true,
    showProfile: true,
    profile: {
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop',
      menuItems: [
        { name: 'Your Profile', href: '/profile' },
        { name: 'Settings', href: '/settings' },
        { name: 'Sign out', onClick: fn() },
      ],
    },
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
})

