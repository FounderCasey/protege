import React, { useState } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { storage } from 'utils/db'
import JobCardImage from './JobCardImage'

const JobCard = ({ job }) => {
  const [logoUrl, setLogoUrl] = useState('')
  const [loading, setLoading] = useState(true)

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ]

  const postDate = new Date(job.postedAt)

  const formattedPostDate = `${
    months[postDate.getMonth()]
  } ${postDate.getDate()}`

  storage
    .ref('images')
    .child(job.companyLogo)
    .getDownloadURL()
    .then((url) => {
      setLogoUrl(url)
      setLoading(false)
    })
    .catch((error) => {
      console.log(error)
    })

  return (
    <Link data-cy={`job-card-link-${job.id}`} href={`/job-board/${job.id}`}>
      <a>
        <div className='flex px-3 py-4 mb-6 transition duration-150 ease-in-out transform bg-white border-l-4 border-teal-500 shadow md:mb-12 md:px-6 hover:shadow-md'>
          <div
            className='relative flex-col hidden p-2 overflow-hidden rounded-full shadow-md md:flex md:w-1/6'
            style={{ width: 75, height: 75 }}
          >
            <div
              style={{ width: 75, height: 75 }}
              className={`absolute bg-white transition ease-in-out duration-300 ${
                loading ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <JobCardImage logoUrl={logoUrl} job={job} />
          </div>

          <div className='flex justify-between w-full md:w-11/12 md:pl-6'>
            <div className='flex flex-col justify-between'>
              <div>
                <p
                  data-cy={`job-card-company-name-${job.id}`}
                  className='mb-1 text-sm text-blue-700'
                >
                  {job.companyName}
                </p>

                <h2
                  data-cy={`job-card-job-title-${job.id}`}
                  className='font-semibold leading-tight text-blue-900 md:-mt-1 text-xl capitalize'
                >
                  {job.jobTitle}
                </h2>
              </div>

              <p
                data-cy={`job-card-role-focus-${job.id}`}
                className='text-teal-700'
              >
                {job.roleFocus}
              </p>
            </div>

            <div className='flex items-center text-right'>
              <p
                data-cy={`job-card-formatted-date-${job.id}`}
                className='font-semibold text-teal-700 text-'
              >
                {formattedPostDate}
              </p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

JobCard.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    companyLogo: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    roleFocus: PropTypes.string.isRequired,
    postedAt: PropTypes.string.isRequired,
  }).isRequired,
}

export default JobCard
