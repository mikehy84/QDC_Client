import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
    return (
        <div className="footer">
            <div className="info">
                <div>
                    <h4  >Suite 219, 198 East Island Hwy <Link target='_blank' to="https://parksvilledowntown.ca/">Parksville,</Link>  BC, Canada</h4>
                    <h4>
                        <a href="tel:+1250586-1914">(250)586-1914</a>
                    </h4>
                    <h4>
                        <a href="mailto:general@qualitydraftingco.com">general@qualitydraftingco.com</a>

                    </h4>
                </div>
                <div>
                    <small> Copyright (C) 2022 - all rights reserved </small>
                    <small>
                        Site By &nbsp;
                        <a href="https://ezcode.ca" target="_blank">EZcode</a>
                    </small>
                </div>
            </div>
        </div>
    )
}
