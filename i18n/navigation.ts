import {createNavigation} from 'next-intl/navigation';

export const {Link, redirect, usePathname, useRouter} =
  createNavigation({
    locales: ['en', 'ja', 'vi'],
    localePrefix: 'always'
  });