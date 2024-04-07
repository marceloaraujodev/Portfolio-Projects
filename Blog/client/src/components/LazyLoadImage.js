import React from 'react'
import LazyLoad from 'react-lazyload';

export default function LazyLoadImage({src, alt}) {
  return (
    <LazyLoad height={300}>
      <img src={src} alt={alt} />
    </LazyLoad>
  )
}
