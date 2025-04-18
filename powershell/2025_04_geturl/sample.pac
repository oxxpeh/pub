function FindProxyForURL(url, host)
{
    if (dnsDomainIs(host, ".pass.org")||
    // permit list
        dnsDomainIs(host, "wikimedia.org")||
        dnsDomainIs(host, "wikipedia.org")
        )
        {return "DIRECT";} 
    else if (dnsDomainIs(host, "xxxxx.com") ||
    // blocklist start
    dnsDomainIs(host, "xxx1.com")||
    dnsDomainIs(host, "xxx2.com")
    // blocklist end
    )
        {return "PROXY 127.0.0.1:8080";}
    else
        {return "DIRECT";}
}






