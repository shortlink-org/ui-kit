import { useState, type ComponentProps } from 'react'
import preview from '#.storybook/preview'

import Header from './Header'

const meta = preview.meta({
  title: 'Page/Header',
  component: Header,
})

export const Default = meta.story({
  args: { title: 'Header' },
  render: (args: ComponentProps<typeof Header>) => <Header {...args} />,
})

/**
 * Marketing hero with nav, CTA, and responsive menu.
 */
export const MarketingHero = meta.story({
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <header className="bg-white dark:bg-gray-900">
        <nav className="relative bg-white dark:bg-gray-900">
          <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
            <div className="flex items-center justify-between">
              <a href="#">
                <img
                  className="w-auto h-6 sm:h-7"
                  src="https://merakiui.com/images/full-logo.svg"
                  alt="Logo"
                />
              </a>

              {/* Mobile menu button */}
              <div className="flex md:hidden">
                <button
                  onClick={() => setIsOpen((prev) => !prev)}
                  type="button"
                  className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                  aria-label="toggle menu"
                >
                  {!isOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 8h16M4 16h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div
              className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent md:mt-0 md:p-0 md:top-0 md:relative md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center ${
                isOpen
                  ? 'translate-x-0 opacity-100'
                  : 'opacity-0 -translate-x-full md:opacity-100 md:translate-x-0'
              }`}
            >
              <div className="flex flex-col md:flex-row md:mx-6">
                {['Home', 'Shop', 'Contact', 'About'].map((item) => (
                  <a
                    key={item}
                    className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                    href="#"
                  >
                    {item}
                  </a>
                ))}
              </div>

              <div className="flex justify-center md:block">
                <a
                  className="relative text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
                  href="#"
                  aria-label="Cart"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="absolute top-0 left-0 p-1 text-xs text-white bg-blue-500 rounded-full" />
                </a>
              </div>
            </div>
          </div>
        </nav>

        <div className="container px-6 py-16 mx-auto">
          <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
                  Best place to choose <br /> your{' '}
                  <span className="text-blue-500 ">clothes</span>
                </h1>

                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Porro beatae error laborum ab amet sunt recusandae?
                  Requiciendis natus perspiciatis optio.
                </p>

                <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                  Shop Now
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
              <img
                className="w-full h-full lg:max-w-3xl"
                src="https://merakiui.com/images/components/Catalogue-pana.svg"
                alt="Catalogue"
              />
            </div>
          </div>
        </div>
      </header>
    )
  },
})
