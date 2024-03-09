import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'

const Landingpage = () => {
  return (
    <div>Landingpagev(unporotected)
      <div>
        <Link href='/sign-in'>
          <Button>
            login
          </Button>
        </Link>
        <Link href='/sign-up'>
          <Button>
            Register
          </Button>
        </Link>

      </div>
    </div>
  )
}

export default Landingpage;