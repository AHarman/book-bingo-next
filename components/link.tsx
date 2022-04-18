// Taken from MUI example: https://github.com/mui/material-ui/blob/8277e3057838f542877a356779fa88ca362ff632/examples/nextjs-with-typescript/src/Link.tsx
import * as React from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { styled } from '@mui/material/styles';

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled('a')({});

interface NextLinkComposedProps
    extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Omit<NextLinkProps, 'href' | 'as'> {
    to: NextLinkProps['href'];
    linkAs?: NextLinkProps['as'];
}

export const NextLinkComposed = React.forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
    function NextLinkComposed(props, ref) {
        const { to, linkAs, replace, scroll, shallow, prefetch, locale, ...other } = props;

        return (
            <NextLink
                href={to}
                prefetch={prefetch}
                as={linkAs}
                replace={replace}
                scroll={scroll}
                shallow={shallow}
                passHref
                locale={locale}
            >
                <Anchor ref={ref} {...other} />
            </NextLink>
        );
    },
);
