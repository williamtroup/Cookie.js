/*
 * Cookie.js Library v0.1.0
 *
 * Copyright 2021 Bunoon
 * Released under the GNU AGPLv3 license
 */


/**
 * cookieJs().
 * 
 * The main Cookie.js class.
 * 
 * @class
 */
function cookieJs() {
    var _navigator = navigator,
        _document = document;

    /**
     * read().
     * 
     * Reads a cookie by name and returns its value.
     * 
     * @param       {sting}     cookieName                                  The name of the cookie.
     * 
     * @returns     {string}                                                The value stored for the cookie (or null if it cannot be found).
     */
    this.read = function( cookieName ) {
        var result = null;

        if ( this.enabled() ) {
            var cookies = _document.cookie.split( ";" ),
                cookiesLength = cookies.length;

            for ( var cookieIndex = 0; cookieIndex < cookiesLength; cookieIndex++ ) {
                var readCookieName = cookies[ cookieIndex ].substring( 0, cookies[ cookieIndex ].indexOf( "=" ) ),
                    readCookieValue = cookies[ cookieIndex ].substring( cookies[ cookieIndex ].indexOf( "=" ) + 1 );

                readCookieName = readCookieName.trim();

                if ( readCookieName === cookieName ) {
                    result = decodeURIComponent( readCookieValue );
                    break;
                }
            }
        }

        return result;
    };

    /**
     * write().
     * 
     * Writes a cookie by name and value.
     * 
     * @param       {sting}     cookieName                                  The name of the cookie.
     * @param       {sting}     value                                       The value to store.
     * @param       {number}    daysToExpire                                How many days until the cookie expires (defaults to 365).
     * @param       {sting}     path                                        The path the cookie applies to (defaults to "/").
     * 
     * @returns     {boolean}                                               The boolean flag stating if the cookie has been written.
     */
    this.write = function( cookieName, value, daysToExpire, path ) {
        var written = false;

        if ( this.enabled() ) {
            daysToExpire = !isDefined( daysToExpire ) ? 365 : daysToExpire;
            path = !isDefined( path ) ? "/" : path;
            value = encodeURIComponent( value );

            if ( path != null && path !== "" ) {
                value += "; path=" + path;
            }

            if ( daysToExpire > 0 ) {
                var expiryDate = new Date();

                expiryDate.setDate( expiryDate.getDate() + daysToExpire );
                value += "; expires=" + expiryDate.toUTCString();
            }

            _document.cookie = cookieName + "=" + value;
            written = true;
        }

        return written;
    };

    /**
     * remove().
     * 
     * Removes a cookie by name.
     * 
     * @param       {sting}     cookieName                                  The name of the cookie.
     * 
     * @returns     {boolean}                                               The boolean flag stating if the cookie has been removed.
     */
    this.remove = function( cookieName ) {
        var added = false;

        if ( this.enabled() && this.exists( cookieName ) ) {
            _document.cookie = cookieName + "=; expires=Thu, 01-Jan-70 00:00:01 GMT;";
            added = true;
        }

        return added;
    };

    /**
     * enabled().
     * 
     * States if cookies are enabled in the browser.
     * 
     * @returns     {boolean}                                               The boolean flag stating if cookies are enabled.
     */
    this.enabled = function() {
        return _navigator.cookieEnabled;
    };

    /**
     * exists().
     * 
     * Check if cookie by name exists.
     * 
     * @param       {sting}     cookieName                                  The name of the cookie.
     * 
     * @returns     {boolean}                                               The boolean flag stating if the cookie exists.
     */
    this.exists = function( cookieName ) {
        return this.read( cookieName ) !== null;
    };


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Validation
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function isDefined( data ) {
        return data !== undefined && data !== null && data !== "";
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Initialize Cookie.js
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    ( function ( documentObject, navigatorObject ) {
        _document = documentObject;
        _navigator = navigatorObject;

    } ) ( document, navigator );
}