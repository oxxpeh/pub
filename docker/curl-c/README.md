# curl compressedにショートオプションつけてみるDockerFile
`--compressed`に`-9`を割り当てるようにソースを変更する  
テキストの圧縮しても動画トラフィックに比べたら微微たるものですが…  
ver8.13.0で実施  
変更箇所は ` grep -r compressed .`で探した…
## 使い方
``` bash
curl -L --compressed -O https://raw.githubusercontent.com/oxxpeh/pub/main/docker/curl-c/DockerFile
curl -L --compressed -O https://raw.githubusercontent.com/oxxpeh/pub/main/docker/curl-c/diff.txt
curl -L --compressed -O config.guess 'https://git.savannah.gnu.org/gitweb/?p=config.git;a=blob_plain;f=config.guess;hb=HEAD'
curl -L --compressed -O config.sub 'https://git.savannah.gnu.org/gitweb/?p=config.git;a=blob_plain;f=config.sub;hb=HEAD'
docker build --build-arg HTTP_PROXY=http://172.16.200.47:3128  -t curl-b-img .
docker run -it  --name curl-b1 --hostname curl-b1 curl-b-img bash
# -- 以下はコンテナで
/root/ini.sh
```
### その他
#### configure
「configure.ac」から`autoreconf -i`で作成されること  
その際「config.guess」「config.fig」も使用されると知った  
「configure」はtar.gzに入ってたけど`git clone`の結果には入ってなかった  
#### ショートオプションの空き確認
「/src/tool_getparam.c」から以下コピーしてipythonで細工、英数は「7 8 9 W」しか空いてない…
``` python
aas_xx="""
  {"abstract-unix-socket",       ARG_FILE, ' ', C_ABSTRACT_UNIX_SOCKET},
  {"alpn",                       ARG_BOOL|ARG_NO|ARG_TLS, ' ', C_ALPN},
  {"alt-svc",                    ARG_STRG, ' ', C_ALT_SVC},
  {"anyauth",                    ARG_BOOL, ' ', C_ANYAUTH},
  {"append",                     ARG_BOOL, 'a', C_APPEND},
  {"aws-sigv4",                  ARG_STRG, ' ', C_AWS_SIGV4},
  {"basic",                      ARG_BOOL, ' ', C_BASIC},
  {"buffer",                     ARG_BOOL|ARG_NO, 'N', C_BUFFER},
  {"ca-native",                  ARG_BOOL|ARG_TLS, ' ', C_CA_NATIVE},
  {"cacert",                     ARG_FILE|ARG_TLS, ' ', C_CACERT},
  {"capath",                     ARG_FILE|ARG_TLS, ' ', C_CAPATH},
  {"cert",                       ARG_FILE|ARG_TLS, 'E', C_CERT},
  {"cert-status",                ARG_BOOL|ARG_TLS, ' ', C_CERT_STATUS},
  {"cert-type",                  ARG_STRG|ARG_TLS, ' ', C_CERT_TYPE},
  {"ciphers",                    ARG_STRG|ARG_TLS, ' ', C_CIPHERS},
  {"clobber",                    ARG_BOOL|ARG_NO, ' ', C_CLOBBER},
  {"compressed",                 ARG_BOOL, ' ', C_COMPRESSED},
  {"compressed-ssh",             ARG_BOOL, ' ', C_COMPRESSED_SSH},
  {"config",                     ARG_FILE, 'K', C_CONFIG},
  {"connect-timeout",            ARG_STRG, ' ', C_CONNECT_TIMEOUT},
  {"connect-to",                 ARG_STRG, ' ', C_CONNECT_TO},
  {"continue-at",                ARG_STRG, 'C', C_CONTINUE_AT},
  {"cookie",                     ARG_STRG, 'b', C_COOKIE},
  {"cookie-jar",                 ARG_STRG, 'c', C_COOKIE_JAR},
  {"create-dirs",                ARG_BOOL, ' ', C_CREATE_DIRS},
  {"create-file-mode",           ARG_STRG, ' ', C_CREATE_FILE_MODE},
  {"crlf",                       ARG_BOOL, ' ', C_CRLF},
  {"crlfile",                    ARG_FILE|ARG_TLS, ' ', C_CRLFILE},
  {"curves",                     ARG_STRG|ARG_TLS, ' ', C_CURVES},
  {"data",                       ARG_STRG, 'd', C_DATA},
  {"data-ascii",                 ARG_STRG, ' ', C_DATA_ASCII},
  {"data-binary",                ARG_STRG, ' ', C_DATA_BINARY},
  {"data-raw",                   ARG_STRG, ' ', C_DATA_RAW},
  {"data-urlencode",             ARG_STRG, ' ', C_DATA_URLENCODE},
  {"delegation",                 ARG_STRG, ' ', C_DELEGATION},
  {"digest",                     ARG_BOOL, ' ', C_DIGEST},
  {"disable",                    ARG_BOOL, 'q', C_DISABLE},
  {"disable-eprt",               ARG_BOOL, ' ', C_DISABLE_EPRT},
  {"disable-epsv",               ARG_BOOL, ' ', C_DISABLE_EPSV},
  {"disallow-username-in-url",   ARG_BOOL, ' ', C_DISALLOW_USERNAME_IN_URL},
  {"dns-interface",              ARG_STRG, ' ', C_DNS_INTERFACE},
  {"dns-ipv4-addr",              ARG_STRG, ' ', C_DNS_IPV4_ADDR},
  {"dns-ipv6-addr",              ARG_STRG, ' ', C_DNS_IPV6_ADDR},
  {"dns-servers",                ARG_STRG, ' ', C_DNS_SERVERS},
  {"doh-cert-status",            ARG_BOOL|ARG_TLS, ' ', C_DOH_CERT_STATUS},
  {"doh-insecure",               ARG_BOOL|ARG_TLS, ' ', C_DOH_INSECURE},
  {"doh-url"        ,            ARG_STRG|ARG_TLS, ' ', C_DOH_URL},
  {"dump-ca-embed",              ARG_NONE|ARG_TLS, ' ', C_DUMP_CA_EMBED},
  {"dump-header",                ARG_FILE, 'D', C_DUMP_HEADER},
  {"ech",                        ARG_STRG|ARG_TLS, ' ', C_ECH},
  {"egd-file",                   ARG_STRG, ' ', C_EGD_FILE},
  {"engine",                     ARG_STRG|ARG_TLS, ' ', C_ENGINE},
  {"eprt",                       ARG_BOOL, ' ', C_EPRT},
  {"epsv",                       ARG_BOOL, ' ', C_EPSV},
  {"etag-compare",               ARG_FILE, ' ', C_ETAG_COMPARE},
  {"etag-save",                  ARG_FILE, ' ', C_ETAG_SAVE},
  {"expect100-timeout",          ARG_STRG, ' ', C_EXPECT100_TIMEOUT},
  {"fail",                       ARG_BOOL, 'f', C_FAIL},
  {"fail-early",                 ARG_BOOL, ' ', C_FAIL_EARLY},
  {"fail-with-body",             ARG_BOOL, ' ', C_FAIL_WITH_BODY},
  {"false-start",                ARG_BOOL, ' ', C_FALSE_START},
  {"form",                       ARG_STRG, 'F', C_FORM},
  {"form-escape",                ARG_BOOL, ' ', C_FORM_ESCAPE},
  {"form-string",                ARG_STRG, ' ', C_FORM_STRING},
  {"ftp-account",                ARG_STRG, ' ', C_FTP_ACCOUNT},
  {"ftp-alternative-to-user",    ARG_STRG, ' ', C_FTP_ALTERNATIVE_TO_USER},
  {"ftp-create-dirs",            ARG_BOOL, ' ', C_FTP_CREATE_DIRS},
  {"ftp-method",                 ARG_STRG, ' ', C_FTP_METHOD},
  {"ftp-pasv",                   ARG_BOOL, ' ', C_FTP_PASV},
  {"ftp-port",                   ARG_STRG, 'P', C_FTP_PORT},
  {"ftp-pret",                   ARG_BOOL, ' ', C_FTP_PRET},
  {"ftp-skip-pasv-ip",           ARG_BOOL, ' ', C_FTP_SKIP_PASV_IP},
  {"ftp-ssl",                    ARG_BOOL|ARG_TLS, ' ', C_FTP_SSL},
  {"ftp-ssl-ccc",                ARG_BOOL|ARG_TLS, ' ', C_FTP_SSL_CCC},
  {"ftp-ssl-ccc-mode",           ARG_STRG|ARG_TLS, ' ', C_FTP_SSL_CCC_MODE},
  {"ftp-ssl-control",            ARG_BOOL|ARG_TLS, ' ', C_FTP_SSL_CONTROL},
  {"ftp-ssl-reqd",               ARG_BOOL|ARG_TLS, ' ', C_FTP_SSL_REQD},
  {"get",                        ARG_BOOL, 'G', C_GET},
  {"globoff",                    ARG_BOOL, 'g', C_GLOBOFF},
  {"happy-eyeballs-timeout-ms",  ARG_STRG, ' ', C_HAPPY_EYEBALLS_TIMEOUT_MS},
  {"haproxy-clientip",           ARG_STRG, ' ', C_HAPROXY_CLIENTIP},
  {"haproxy-protocol",           ARG_BOOL, ' ', C_HAPROXY_PROTOCOL},
  {"head",                       ARG_BOOL, 'I', C_HEAD},
  {"header",                     ARG_STRG, 'H', C_HEADER},
  {"help",                       ARG_BOOL, 'h', C_HELP},
  {"hostpubmd5",                 ARG_STRG, ' ', C_HOSTPUBMD5},
  {"hostpubsha256",              ARG_STRG, ' ', C_HOSTPUBSHA256},
  {"hsts",                       ARG_STRG|ARG_TLS, ' ', C_HSTS},
  {"http0.9",                    ARG_BOOL, ' ', C_HTTP0_9},
  {"http1.0",                    ARG_NONE, '0', C_HTTP1_0},
  {"http1.1",                    ARG_NONE, ' ', C_HTTP1_1},
  {"http2",                      ARG_NONE, ' ', C_HTTP2},
  {"http2-prior-knowledge",      ARG_NONE, ' ', C_HTTP2_PRIOR_KNOWLEDGE},
  {"http3",                      ARG_NONE|ARG_TLS, ' ', C_HTTP3},
  {"http3-only",                 ARG_NONE|ARG_TLS, ' ', C_HTTP3_ONLY},
  {"ignore-content-length",      ARG_BOOL, ' ', C_IGNORE_CONTENT_LENGTH},
  {"include",                    ARG_BOOL, ' ', C_INCLUDE},
  {"insecure",                   ARG_BOOL, 'k', C_INSECURE},
  {"interface",                  ARG_STRG, ' ', C_INTERFACE},
  {"ip-tos",                     ARG_STRG, ' ', C_IP_TOS},
#ifndef CURL_DISABLE_IPFS
  {"ipfs-gateway",               ARG_STRG, ' ', C_IPFS_GATEWAY},
#endif /* !CURL_DISABLE_IPFS */
  {"ipv4",                       ARG_NONE, '4', C_IPV4},
  {"ipv6",                       ARG_NONE, '6', C_IPV6},
  {"json",                       ARG_STRG, ' ', C_JSON},
  {"junk-session-cookies",       ARG_BOOL, 'j', C_JUNK_SESSION_COOKIES},
  {"keepalive",                  ARG_BOOL|ARG_NO, ' ', C_KEEPALIVE},
  {"keepalive-cnt",              ARG_STRG, ' ', C_KEEPALIVE_CNT},
  {"keepalive-time",             ARG_STRG, ' ', C_KEEPALIVE_TIME},
  {"key",                        ARG_FILE|ARG_TLS, ' ', C_KEY},
  {"key-type",                   ARG_STRG|ARG_TLS, ' ', C_KEY_TYPE},
  {"krb",                        ARG_STRG, ' ', C_KRB},
  {"krb4",                       ARG_STRG, ' ', C_KRB4},
  {"libcurl",                    ARG_STRG, ' ', C_LIBCURL},
  {"limit-rate",                 ARG_STRG, ' ', C_LIMIT_RATE},
  {"list-only",                  ARG_BOOL, 'l', C_LIST_ONLY},
  {"local-port",                 ARG_STRG, ' ', C_LOCAL_PORT},
  {"location",                   ARG_BOOL, 'L', C_LOCATION},
  {"location-trusted",           ARG_BOOL, ' ', C_LOCATION_TRUSTED},
  {"login-options",              ARG_STRG, ' ', C_LOGIN_OPTIONS},
  {"mail-auth",                  ARG_STRG, ' ', C_MAIL_AUTH},
  {"mail-from",                  ARG_STRG, ' ', C_MAIL_FROM},
  {"mail-rcpt",                  ARG_STRG, ' ', C_MAIL_RCPT},
  {"mail-rcpt-allowfails",       ARG_BOOL, ' ', C_MAIL_RCPT_ALLOWFAILS},
  {"manual",                     ARG_BOOL, 'M', C_MANUAL},
  {"max-filesize",               ARG_STRG, ' ', C_MAX_FILESIZE},
  {"max-redirs",                 ARG_STRG, ' ', C_MAX_REDIRS},
  {"max-time",                   ARG_STRG, 'm', C_MAX_TIME},
  {"metalink",                   ARG_BOOL, ' ', C_METALINK},
  {"mptcp",                      ARG_BOOL, ' ', C_MPTCP},
  {"negotiate",                  ARG_BOOL, ' ', C_NEGOTIATE},
  {"netrc",                      ARG_BOOL, 'n', C_NETRC},
  {"netrc-file",                 ARG_FILE, ' ', C_NETRC_FILE},
  {"netrc-optional",             ARG_BOOL, ' ', C_NETRC_OPTIONAL},
  {"next",                       ARG_NONE, ':', C_NEXT},
  {"noproxy",                    ARG_STRG, ' ', C_NOPROXY},
  {"npn",                        ARG_BOOL|ARG_NO, ' ', C_NPN},
  {"ntlm",                       ARG_BOOL, ' ', C_NTLM},
  {"ntlm-wb",                    ARG_BOOL, ' ', C_NTLM_WB},
  {"oauth2-bearer",              ARG_STRG, ' ', C_OAUTH2_BEARER},
  {"output",                     ARG_FILE, 'o', C_OUTPUT},
  {"output-dir",                 ARG_STRG, ' ', C_OUTPUT_DIR},
  {"parallel",                   ARG_BOOL, 'Z', C_PARALLEL},
  {"parallel-immediate",         ARG_BOOL, ' ', C_PARALLEL_IMMEDIATE},
  {"parallel-max",               ARG_STRG, ' ', C_PARALLEL_MAX},
  {"pass",                       ARG_STRG, ' ', C_PASS},
  {"path-as-is",                 ARG_BOOL, ' ', C_PATH_AS_IS},
  {"pinnedpubkey",               ARG_STRG|ARG_TLS, ' ', C_PINNEDPUBKEY},
  {"post301",                    ARG_BOOL, ' ', C_POST301},
  {"post302",                    ARG_BOOL, ' ', C_POST302},
  {"post303",                    ARG_BOOL, ' ', C_POST303},
  {"preproxy",                   ARG_STRG, ' ', C_PREPROXY},
  {"progress-bar",               ARG_BOOL, '#', C_PROGRESS_BAR},
  {"progress-meter",             ARG_BOOL|ARG_NO, ' ', C_PROGRESS_METER},
  {"proto",                      ARG_STRG, ' ', C_PROTO},
  {"proto-default",              ARG_STRG, ' ', C_PROTO_DEFAULT},
  {"proto-redir",                ARG_STRG, ' ', C_PROTO_REDIR},
  {"proxy",                      ARG_STRG, 'x', C_PROXY},
  {"proxy-anyauth",              ARG_BOOL, ' ', C_PROXY_ANYAUTH},
  {"proxy-basic",                ARG_BOOL, ' ', C_PROXY_BASIC},
  {"proxy-ca-native",            ARG_BOOL|ARG_TLS, ' ', C_PROXY_CA_NATIVE},
  {"proxy-cacert",               ARG_FILE|ARG_TLS, ' ', C_PROXY_CACERT},
  {"proxy-capath",               ARG_FILE|ARG_TLS, ' ', C_PROXY_CAPATH},
  {"proxy-cert",                 ARG_FILE|ARG_TLS, ' ', C_PROXY_CERT},
  {"proxy-cert-type",            ARG_STRG|ARG_TLS, ' ', C_PROXY_CERT_TYPE},
  {"proxy-ciphers",              ARG_STRG|ARG_TLS, ' ', C_PROXY_CIPHERS},
  {"proxy-crlfile",              ARG_FILE|ARG_TLS, ' ', C_PROXY_CRLFILE},
  {"proxy-digest",               ARG_BOOL, ' ', C_PROXY_DIGEST},
  {"proxy-header",               ARG_STRG, ' ', C_PROXY_HEADER},
  {"proxy-http2",                ARG_BOOL, ' ', C_PROXY_HTTP2},
  {"proxy-insecure",             ARG_BOOL, ' ', C_PROXY_INSECURE},
  {"proxy-key",                  ARG_FILE|ARG_TLS, ' ', C_PROXY_KEY},
  {"proxy-key-type",             ARG_STRG|ARG_TLS, ' ', C_PROXY_KEY_TYPE},
  {"proxy-negotiate",            ARG_BOOL, ' ', C_PROXY_NEGOTIATE},
  {"proxy-ntlm",                 ARG_BOOL, ' ', C_PROXY_NTLM},
  {"proxy-pass",                 ARG_STRG, ' ', C_PROXY_PASS},
  {"proxy-pinnedpubkey",         ARG_STRG|ARG_TLS, ' ', C_PROXY_PINNEDPUBKEY},
  {"proxy-service-name",         ARG_STRG, ' ', C_PROXY_SERVICE_NAME},
  {"proxy-ssl-allow-beast",      ARG_BOOL|ARG_TLS, ' ',
   C_PROXY_SSL_ALLOW_BEAST},
  {"proxy-ssl-auto-client-cert", ARG_BOOL|ARG_TLS, ' ',
   C_PROXY_SSL_AUTO_CLIENT_CERT},
  {"proxy-tls13-ciphers",        ARG_STRG|ARG_TLS, ' ', C_PROXY_TLS13_CIPHERS},
  {"proxy-tlsauthtype",          ARG_STRG|ARG_TLS, ' ', C_PROXY_TLSAUTHTYPE},
  {"proxy-tlspassword",          ARG_STRG|ARG_TLS, ' ', C_PROXY_TLSPASSWORD},
  {"proxy-tlsuser",              ARG_STRG|ARG_TLS, ' ', C_PROXY_TLSUSER},
  {"proxy-tlsv1",                ARG_NONE|ARG_TLS, ' ', C_PROXY_TLSV1},
  {"proxy-user",                 ARG_STRG, 'U', C_PROXY_USER},
  {"proxy1.0",                   ARG_STRG, ' ', C_PROXY1_0},
  {"proxytunnel",                ARG_BOOL, 'p', C_PROXYTUNNEL},
  {"pubkey",                     ARG_STRG, ' ', C_PUBKEY},
  {"quote",                      ARG_STRG, 'Q', C_QUOTE},
  {"random-file",                ARG_FILE, ' ', C_RANDOM_FILE},
  {"range",                      ARG_STRG, 'r', C_RANGE},
  {"rate",                       ARG_STRG, ' ', C_RATE},
  {"raw",                        ARG_BOOL, ' ', C_RAW},
  {"referer",                    ARG_STRG, 'e', C_REFERER},
  {"remote-header-name",         ARG_BOOL, 'J', C_REMOTE_HEADER_NAME},
  {"remote-name",                ARG_BOOL, 'O', C_REMOTE_NAME},
  {"remote-name-all",            ARG_BOOL, ' ', C_REMOTE_NAME_ALL},
  {"remote-time",                ARG_BOOL, 'R', C_REMOTE_TIME},
  {"remove-on-error",            ARG_BOOL, ' ', C_REMOVE_ON_ERROR},
  {"request",                    ARG_STRG, 'X', C_REQUEST},
  {"request-target",             ARG_STRG, ' ', C_REQUEST_TARGET},
  {"resolve",                    ARG_STRG, ' ', C_RESOLVE},
  {"retry",                      ARG_STRG, ' ', C_RETRY},
  {"retry-all-errors",           ARG_BOOL, ' ', C_RETRY_ALL_ERRORS},
  {"retry-connrefused",          ARG_BOOL, ' ', C_RETRY_CONNREFUSED},
  {"retry-delay",                ARG_STRG, ' ', C_RETRY_DELAY},
  {"retry-max-time",             ARG_STRG, ' ', C_RETRY_MAX_TIME},
  {"sasl-authzid",               ARG_STRG, ' ', C_SASL_AUTHZID},
  {"sasl-ir",                    ARG_BOOL, ' ', C_SASL_IR},
  {"service-name",               ARG_STRG, ' ', C_SERVICE_NAME},
  {"sessionid",                  ARG_BOOL|ARG_NO, ' ', C_SESSIONID},
  {"show-error",                 ARG_BOOL, 'S', C_SHOW_ERROR},
  {"show-headers",               ARG_BOOL, 'i', C_SHOW_HEADERS},
  {"silent",                     ARG_BOOL, 's', C_SILENT},
  {"skip-existing",              ARG_BOOL, ' ', C_SKIP_EXISTING},
  {"socks4",                     ARG_STRG, ' ', C_SOCKS4},
  {"socks4a",                    ARG_STRG, ' ', C_SOCKS4A},
  {"socks5",                     ARG_STRG, ' ', C_SOCKS5},
  {"socks5-basic",               ARG_BOOL, ' ', C_SOCKS5_BASIC},
  {"socks5-gssapi",              ARG_BOOL, ' ', C_SOCKS5_GSSAPI},
  {"socks5-gssapi-nec",          ARG_BOOL, ' ', C_SOCKS5_GSSAPI_NEC},
  {"socks5-gssapi-service",      ARG_STRG, ' ', C_SOCKS5_GSSAPI_SERVICE},
  {"socks5-hostname",            ARG_STRG, ' ', C_SOCKS5_HOSTNAME},
  {"speed-limit",                ARG_STRG, 'Y', C_SPEED_LIMIT},
  {"speed-time",                 ARG_STRG, 'y', C_SPEED_TIME},
  {"ssl",                        ARG_BOOL|ARG_TLS, ' ', C_SSL},
  {"ssl-allow-beast",            ARG_BOOL|ARG_TLS, ' ', C_SSL_ALLOW_BEAST},
  {"ssl-auto-client-cert",       ARG_BOOL|ARG_TLS, ' ',
   C_SSL_AUTO_CLIENT_CERT},
  {"ssl-no-revoke",              ARG_BOOL|ARG_TLS, ' ', C_SSL_NO_REVOKE},
  {"ssl-reqd",                   ARG_BOOL|ARG_TLS, ' ', C_SSL_REQD},
  {"ssl-revoke-best-effort",     ARG_BOOL|ARG_TLS, ' ',
   C_SSL_REVOKE_BEST_EFFORT},
  {"ssl-sessions",               ARG_FILE|ARG_TLS, ' ', C_SSL_SESSIONS},
  {"sslv2",                      ARG_NONE|ARG_TLS, '2', C_SSLV2},
  {"sslv3",                      ARG_NONE|ARG_TLS, '3', C_SSLV3},
  {"stderr",                     ARG_FILE, ' ', C_STDERR},
  {"styled-output",              ARG_BOOL, ' ', C_STYLED_OUTPUT},
  {"suppress-connect-headers",   ARG_BOOL, ' ', C_SUPPRESS_CONNECT_HEADERS},
  {"tcp-fastopen",               ARG_BOOL, ' ', C_TCP_FASTOPEN},
  {"tcp-nodelay",                ARG_BOOL, ' ', C_TCP_NODELAY},
  {"telnet-option",              ARG_STRG, 't', C_TELNET_OPTION},
#ifdef DEBUGBUILD
  {"test-duphandle",             ARG_BOOL, ' ', C_TEST_DUPHANDLE},
  {"test-event",                 ARG_BOOL, ' ', C_TEST_EVENT},
#endif
  {"tftp-blksize",               ARG_STRG, ' ', C_TFTP_BLKSIZE},
  {"tftp-no-options",            ARG_BOOL, ' ', C_TFTP_NO_OPTIONS},
  {"time-cond",                  ARG_STRG, 'z', C_TIME_COND},
  {"tls-earlydata",              ARG_BOOL|ARG_TLS, ' ', C_TLS_EARLYDATA},
  {"tls-max",                    ARG_STRG|ARG_TLS, ' ', C_TLS_MAX},
  {"tls13-ciphers",              ARG_STRG|ARG_TLS, ' ', C_TLS13_CIPHERS},
  {"tlsauthtype",                ARG_STRG|ARG_TLS, ' ', C_TLSAUTHTYPE},
  {"tlspassword",                ARG_STRG|ARG_TLS, ' ', C_TLSPASSWORD},
  {"tlsuser",                    ARG_STRG|ARG_TLS, ' ', C_TLSUSER},
  {"tlsv1",                      ARG_NONE|ARG_TLS, '1', C_TLSV1},
  {"tlsv1.0",                    ARG_NONE|ARG_TLS, ' ', C_TLSV1_0},
  {"tlsv1.1",                    ARG_NONE|ARG_TLS, ' ', C_TLSV1_1},
  {"tlsv1.2",                    ARG_NONE|ARG_TLS, ' ', C_TLSV1_2},
  {"tlsv1.3",                    ARG_NONE|ARG_TLS, ' ', C_TLSV1_3},
  {"tr-encoding",                ARG_BOOL, ' ', C_TR_ENCODING},
  {"trace",                      ARG_FILE, ' ', C_TRACE},
  {"trace-ascii",                ARG_FILE, ' ', C_TRACE_ASCII},
  {"trace-config",               ARG_STRG, ' ', C_TRACE_CONFIG},
  {"trace-ids",                  ARG_BOOL, ' ', C_TRACE_IDS},
  {"trace-time",                 ARG_BOOL, ' ', C_TRACE_TIME},
  {"unix-socket",                ARG_FILE, ' ', C_UNIX_SOCKET},
  {"upload-file",                ARG_FILE, 'T', C_UPLOAD_FILE},
  {"upload-flags",               ARG_STRG, ' ', C_UPLOAD_FLAGS},
  {"url",                        ARG_STRG, ' ', C_URL},
  {"url-query",                  ARG_STRG, ' ', C_URL_QUERY},
  {"use-ascii",                  ARG_BOOL, 'B', C_USE_ASCII},
  {"user",                       ARG_STRG, 'u', C_USER},
  {"user-agent",                 ARG_STRG, 'A', C_USER_AGENT},
  {"variable",                   ARG_STRG, ' ', C_VARIABLE},
  {"verbose",                    ARG_BOOL, 'v', C_VERBOSE},
  {"version",                    ARG_BOOL, 'V', C_VERSION},
  {"vlan-priority",              ARG_STRG, ' ', C_VLAN_PRIORITY},
#ifdef USE_WATT32
  {"wdebug",                     ARG_BOOL, ' ', C_WDEBUG},
#endif
  {"write-out",                  ARG_STRG, 'w', C_WRITE_OUT},
  {"xattr",                      ARG_BOOL, ' ', C_XATTR},
"""

In [10]: dd_out = {}
    ...: for nn in aas_xx.split('\n'):
    ...:     #print(nn)
    ...:     #if nn[0] == '#':
    ...:     #    continue
    ...:     ll_nn = nn.split(',')
    ...:     if len(ll_nn) != 5:
    ...:         continue
    ...:     if ll_nn[2] == " ' '":
    ...:         continue
    ...:     nn_key = ll_nn[0].replace('{', '').replace('"', '')
    ...:     nn_v = ll_nn[2].replace('\'','')
    ...:     print(f" {nn_key} {nn_v}")
    ...:     dd_out[nn_key] = nn_v
    ...:
   append  a
   buffer  N
   cert  E
   config  K
   continue-at  C
   cookie  b
   cookie-jar  c
   data  d
   disable  q
   dump-header  D
   fail  f
   form  F
   ftp-port  P
   get  G
   globoff  g
   head  I
   header  H
   help  h
   http1.0  0
   insecure  k
   ipv4  4
   ipv6  6
   junk-session-cookies  j
   list-only  l
   location  L
   manual  M
   max-time  m
   netrc  n
   next  :
   output  o
   parallel  Z
   progress-bar  #
   proxy  x
   proxy-user  U
   proxytunnel  p
   quote  Q
   range  r
   referer  e
   remote-header-name  J
   remote-name  O
   remote-time  R
   request  X
   show-error  S
   show-headers  i
   silent  s
   speed-limit  Y
   speed-time  y
   sslv2  2
   sslv3  3
   telnet-option  t
   time-cond  z
   tlsv1  1
   upload-file  T
   use-ascii  B
   user  u
   user-agent  A
   verbose  v
   version  V
   write-out  w

In [11]: dd_m = dict(sorted(dd_out.items(), key=lambda item: item[1]))

In [12]: dd_m
Out[12]:
{'  progress-bar': ' #',
 '  http1.0': ' 0',
 '  tlsv1': ' 1',
 '  sslv2': ' 2',
 '  sslv3': ' 3',
 '  ipv4': ' 4',
 '  ipv6': ' 6',
 '  next': ' :',
 '  user-agent': ' A',
 '  use-ascii': ' B',
 '  continue-at': ' C',
 '  dump-header': ' D',
 '  cert': ' E',
 '  form': ' F',
 '  get': ' G',
 '  header': ' H',
 '  head': ' I',
 '  remote-header-name': ' J',
 '  config': ' K',
 '  location': ' L',
 '  manual': ' M',
 '  buffer': ' N',
 '  remote-name': ' O',
 '  ftp-port': ' P',
 '  quote': ' Q',
 '  remote-time': ' R',
 '  show-error': ' S',
 '  upload-file': ' T',
 '  proxy-user': ' U',
 '  version': ' V',
 '  request': ' X',
 '  speed-limit': ' Y',
 '  parallel': ' Z',
 '  append': ' a',
 '  cookie': ' b',
 '  cookie-jar': ' c',
 '  data': ' d',
 '  referer': ' e',
 '  fail': ' f',
 '  globoff': ' g',
 '  help': ' h',
 '  show-headers': ' i',
 '  junk-session-cookies': ' j',
 '  insecure': ' k',
 '  list-only': ' l',
 '  max-time': ' m',
 '  netrc': ' n',
 '  output': ' o',
 '  proxytunnel': ' p',
 '  disable': ' q',
 '  range': ' r',
 '  silent': ' s',
 '  telnet-option': ' t',
 '  user': ' u',
 '  verbose': ' v',
 '  write-out': ' w',
 '  proxy': ' x',
 '  speed-time': ' y',
 '  time-cond': ' z'}

```

#### man
dockerではどうすれば…
#### pull request
まだわかりません…そのうち…
#### log
```
[20:51:30]root@curl-t:/
# cd /root/curl

[20:51:40]root@curl-t:src
# make install 

[20:52:01]root@curl-t:src
# curl -v -9 https://raw.githubusercontent.com/oxxpeh/pub/main/docker/curl-c/diff.txt
curl: (48) An unknown option was passed in to libcurl
[20:54:29]root@curl-t:src
# ./curl -v -9 https://raw.githubusercontent.com/oxxpeh/pub/main/docker/curl-c/diff.txt
* Host raw.githubusercontent.com:443 was resolved.
* IPv6: 2606:50c0:8001::154, 2606:50c0:8002::154, 2606:50c0:8003::154, 2606:50c0:8000::154
* IPv4: 185.199.111.133, 185.199.108.133, 185.199.109.133, 185.199.110.133
*   Trying [2606:50c0:8001::154]:443...
* Immediate connect fail for 2606:50c0:8001::154: Network is unreachable
*   Trying [2606:50c0:8002::154]:443...
* Immediate connect fail for 2606:50c0:8002::154: Network is unreachable
*   Trying [2606:50c0:8003::154]:443...
* Immediate connect fail for 2606:50c0:8003::154: Network is unreachable
*   Trying [2606:50c0:8000::154]:443...
* Immediate connect fail for 2606:50c0:8000::154: Network is unreachable
*   Trying 185.199.111.133:443...
* ALPN: curl offers http/1.1
* TLSv1.3 (OUT), TLS handshake, Client hello (1):
*  CAfile: /etc/ssl/certs/ca-certificates.crt
*  CApath: /etc/ssl/certs
* TLSv1.3 (IN), TLS handshake, Server hello (2):
* TLSv1.3 (IN), TLS change cipher, Change cipher spec (1):
* TLSv1.3 (IN), TLS handshake, Encrypted Extensions (8):
* TLSv1.3 (IN), TLS handshake, Certificate (11):
* TLSv1.3 (IN), TLS handshake, CERT verify (15):
* TLSv1.3 (IN), TLS handshake, Finished (20):
* TLSv1.3 (OUT), TLS change cipher, Change cipher spec (1):
* TLSv1.3 (OUT), TLS handshake, Finished (20):
* SSL connection using TLSv1.3 / TLS_AES_128_GCM_SHA256 / x25519 / RSASSA-PSS
* ALPN: server accepted http/1.1
* Server certificate:
*  subject: CN=*.github.io
*  start date: Mar  7 00:00:00 2025 GMT
*  expire date: Mar  7 23:59:59 2026 GMT
*  subjectAltName: host "raw.githubusercontent.com" matched cert's "*.githubusercontent.com"
*  issuer: C=GB; ST=Greater Manchester; L=Salford; O=Sectigo Limited; CN=Sectigo RSA Domain Validation Secure Server CA
*  SSL certificate verify ok.
*   Certificate level 0: Public key type RSA (2048/112 Bits/secBits), signed using sha256WithRSAEncryption
*   Certificate level 1: Public key type RSA (2048/112 Bits/secBits), signed using sha384WithRSAEncryption
*   Certificate level 2: Public key type RSA (4096/152 Bits/secBits), signed using sha384WithRSAEncryption
* Connected to raw.githubusercontent.com (185.199.111.133) port 443
* using HTTP/1.x
> GET /oxxpeh/pub/main/docker/curl-c/diff.txt HTTP/1.1
> Host: raw.githubusercontent.com
> User-Agent: curl/8.13.0-DEV
> Accept: */*
> Accept-Encoding: deflate, gzip
>
* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):
* Request completely sent off
< HTTP/1.1 200 OK
< Connection: keep-alive
< Content-Length: 676
< Cache-Control: max-age=300
< Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'; sandbox
< Content-Type: text/plain; charset=utf-8
< ETag: W/"0d887153e8dab3993b758573e6f89806113fd7e2681221244e0d9b1d6163f422"
< Strict-Transport-Security: max-age=31536000
< X-Content-Type-Options: nosniff
< X-Frame-Options: deny
< X-XSS-Protection: 1; mode=block
< X-GitHub-Request-Id: D3BC:2A4500:1FBF1E:4A050B:6818A6F6
< Content-Encoding: gzip
< Accept-Ranges: bytes
< Date: Mon, 05 May 2025 11:54:34 GMT
< Via: 1.1 varnish
< X-Served-By: cache-itm1220046-ITM
< X-Cache: MISS
< X-Cache-Hits: 0
< X-Timer: S1746446075.567192,VS0,VE280
< Vary: Authorization,Accept-Encoding,Origin
< Access-Control-Allow-Origin: *
< Cross-Origin-Resource-Policy: cross-origin
< X-Fastly-Request-ID: ef3a4c911e068b9f6aaca7226d19a7a7b4a5d549
< Expires: Mon, 05 May 2025 11:59:34 GMT
< Source-Age: 0
<
--- a/docs/cmdline-opts/compressed.md
+++ b/docs/cmdline-opts/compressed.md
@@ -1,6 +1,7 @@
 ---
 c: Copyright (C) Daniel Stenberg, <daniel@haxx.se>, et al.
 SPDX-License-Identifier: curl
+Short: 9
 Long: compressed
 Help: Request compressed response
 Protocols: HTTP
--- a/src/tool_getparam.c
+++ b/src/tool_getparam.c
@@ -104,7 +104,7 @@ static const struct LongShort aliases[]= {
   {"cert-type",                  ARG_STRG|ARG_TLS, ' ', C_CERT_TYPE},
   {"ciphers",                    ARG_STRG|ARG_TLS, ' ', C_CIPHERS},
   {"clobber",                    ARG_BOOL|ARG_NO, ' ', C_CLOBBER},
-  {"compressed",                 ARG_BOOL, ' ', C_COMPRESSED},
+  {"compressed",                 ARG_BOOL, '9', C_COMPRESSED},
   {"compressed-ssh",             ARG_BOOL, ' ', C_COMPRESSED_SSH},
   {"config",                     ARG_FILE, 'K', C_CONFIG},
   {"connect-timeout",            ARG_STRG, ' ', C_CONNECT_TIMEOUT},
--- a/src/tool_listhelp.c.org
+++ b/src/tool_listhelp.c
@@ -72,7 +72,7 @@ const struct helptxt helptext[] = {
   {"    --ciphers <list>",
    "TLS 1.2 (1.1, 1.0) ciphers to use",
    CURLHELP_TLS},
+  {"-9, --compressed",
-  {"    --compressed",
    "Request compressed response",
    CURLHELP_HTTP},
   {"    --compressed-ssh",
--- a/docs/options-in-versions
+++ b/docs/options-in-versions
@@ -23,7 +23,7 @@
 --cert-status                        7.41.0
 --cert-type                          7.9.3
 --ciphers                            7.9
---compressed                         7.10
+--compressed (-9)                    7.10
 --compressed-ssh                     7.56.0
 --config (-K)                        4.10
 --connect-timeout                    7.7

* Connection #0 to host raw.githubusercontent.com left intact
[20:54:34]root@curl-t:src
# ./curl -v https://raw.githubusercontent.com/oxxpeh/pub/main/docker/curl-c/diff.txt
* Host raw.githubusercontent.com:443 was resolved.
* IPv6: 2606:50c0:8000::154, 2606:50c0:8003::154, 2606:50c0:8001::154, 2606:50c0:8002::154
* IPv4: 185.199.111.133, 185.199.108.133, 185.199.110.133, 185.199.109.133
*   Trying [2606:50c0:8000::154]:443...
* Immediate connect fail for 2606:50c0:8000::154: Network is unreachable
*   Trying [2606:50c0:8003::154]:443...
* Immediate connect fail for 2606:50c0:8003::154: Network is unreachable
*   Trying [2606:50c0:8001::154]:443...
* Immediate connect fail for 2606:50c0:8001::154: Network is unreachable
*   Trying [2606:50c0:8002::154]:443...
* Immediate connect fail for 2606:50c0:8002::154: Network is unreachable
*   Trying 185.199.111.133:443...
* ALPN: curl offers http/1.1
* TLSv1.3 (OUT), TLS handshake, Client hello (1):
*  CAfile: /etc/ssl/certs/ca-certificates.crt
*  CApath: /etc/ssl/certs
* TLSv1.3 (IN), TLS handshake, Server hello (2):
* TLSv1.3 (IN), TLS change cipher, Change cipher spec (1):
* TLSv1.3 (IN), TLS handshake, Encrypted Extensions (8):
* TLSv1.3 (IN), TLS handshake, Certificate (11):
* TLSv1.3 (IN), TLS handshake, CERT verify (15):
* TLSv1.3 (IN), TLS handshake, Finished (20):
* TLSv1.3 (OUT), TLS change cipher, Change cipher spec (1):
* TLSv1.3 (OUT), TLS handshake, Finished (20):
* SSL connection using TLSv1.3 / TLS_AES_128_GCM_SHA256 / x25519 / RSASSA-PSS
* ALPN: server accepted http/1.1
* Server certificate:
*  subject: CN=*.github.io
*  start date: Mar  7 00:00:00 2025 GMT
*  expire date: Mar  7 23:59:59 2026 GMT
*  subjectAltName: host "raw.githubusercontent.com" matched cert's "*.githubusercontent.com"
*  issuer: C=GB; ST=Greater Manchester; L=Salford; O=Sectigo Limited; CN=Sectigo RSA Domain Validation Secure Server CA
*  SSL certificate verify ok.
*   Certificate level 0: Public key type RSA (2048/112 Bits/secBits), signed using sha256WithRSAEncryption
*   Certificate level 1: Public key type RSA (2048/112 Bits/secBits), signed using sha384WithRSAEncryption
*   Certificate level 2: Public key type RSA (4096/152 Bits/secBits), signed using sha384WithRSAEncryption
* Connected to raw.githubusercontent.com (185.199.111.133) port 443
* using HTTP/1.x
> GET /oxxpeh/pub/main/docker/curl-c/diff.txt HTTP/1.1
> Host: raw.githubusercontent.com
> User-Agent: curl/8.13.0-DEV
> Accept: */*
>
* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):
* Request completely sent off
< HTTP/1.1 200 OK
< Connection: keep-alive
< Content-Length: 1673
< Cache-Control: max-age=300
< Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'; sandbox
< Content-Type: text/plain; charset=utf-8
< ETag: "5d28551b1be3e7dca88842940b58fff65482e3e8cfd9a6c74bcc1a90f84ad801"
< Strict-Transport-Security: max-age=31536000
< X-Content-Type-Options: nosniff
< X-Frame-Options: deny
< X-XSS-Protection: 1; mode=block
< X-GitHub-Request-Id: B1E9:0897:29415E:6A6BBC:6818A704
< Accept-Ranges: bytes
< Date: Mon, 05 May 2025 11:54:44 GMT
< Via: 1.1 varnish
< X-Served-By: cache-itm1220027-ITM
< X-Cache: MISS
< X-Cache-Hits: 0
< X-Timer: S1746446085.569569,VS0,VE247
< Vary: Authorization,Accept-Encoding,Origin
< Access-Control-Allow-Origin: *
< Cross-Origin-Resource-Policy: cross-origin
< X-Fastly-Request-ID: 38c8624ad42fa5671a2c162ca0e2bdd31c11f6cf
< Expires: Mon, 05 May 2025 11:59:44 GMT
< Source-Age: 0
<
--- a/docs/cmdline-opts/compressed.md
+++ b/docs/cmdline-opts/compressed.md
@@ -1,6 +1,7 @@
 ---
 c: Copyright (C) Daniel Stenberg, <daniel@haxx.se>, et al.
 SPDX-License-Identifier: curl
+Short: 9
 Long: compressed
 Help: Request compressed response
 Protocols: HTTP
--- a/src/tool_getparam.c
+++ b/src/tool_getparam.c
@@ -104,7 +104,7 @@ static const struct LongShort aliases[]= {
   {"cert-type",                  ARG_STRG|ARG_TLS, ' ', C_CERT_TYPE},
   {"ciphers",                    ARG_STRG|ARG_TLS, ' ', C_CIPHERS},
   {"clobber",                    ARG_BOOL|ARG_NO, ' ', C_CLOBBER},
-  {"compressed",                 ARG_BOOL, ' ', C_COMPRESSED},
+  {"compressed",                 ARG_BOOL, '9', C_COMPRESSED},
   {"compressed-ssh",             ARG_BOOL, ' ', C_COMPRESSED_SSH},
   {"config",                     ARG_FILE, 'K', C_CONFIG},
   {"connect-timeout",            ARG_STRG, ' ', C_CONNECT_TIMEOUT},
--- a/src/tool_listhelp.c.org
+++ b/src/tool_listhelp.c
@@ -72,7 +72,7 @@ const struct helptxt helptext[] = {
   {"    --ciphers <list>",
    "TLS 1.2 (1.1, 1.0) ciphers to use",
    CURLHELP_TLS},
+  {"-9, --compressed",
-  {"    --compressed",
    "Request compressed response",
    CURLHELP_HTTP},
   {"    --compressed-ssh",
--- a/docs/options-in-versions
+++ b/docs/options-in-versions
@@ -23,7 +23,7 @@
 --cert-status                        7.41.0
 --cert-type                          7.9.3
 --ciphers                            7.9
---compressed                         7.10
+--compressed (-9)                    7.10
 --compressed-ssh                     7.56.0
 --config (-K)                        4.10
 --connect-timeout                    7.7

* Connection #0 to host raw.githubusercontent.com left intact


[20:54:44]root@curl-t:src
# curl --version
curl 8.13.0-DEV (x86_64-pc-linux-gnu) libcurl/8.12.1 OpenSSL/3.4.1 zlib/1.3.1 brotli/1.1.0 zstd/1.5.6 libidn2/2.3.8 libpsl/0.21.2 libssh2/1.11.1 nghttp2/1
.64.0 librtmp/2.3 OpenLDAP/2.6.9
Release-Date: [unreleased]
Protocols: dict file ftp ftps gopher gophers http https imap imaps ipfs ipns ldap ldaps mqtt pop3 pop3s rtmp rtsp scp sftp smb smbs smtp smtps telnet tftp
 ws wss
Features: alt-svc AsynchDNS brotli GSS-API HSTS HTTP2 HTTPS-proxy IDN IPv6 Kerberos Largefile libz NTLM PSL SPNEGO SSL threadsafe TLS-SRP UnixSockets zstd
WARNING: curl and libcurl versions do not match. Functionality may be affected.
[20:57:07]root@curl-t:src

# ./curl --version
curl 8.13.0-DEV (x86_64-pc-linux-gnu) libcurl/8.13.0-DEV OpenSSL/3.4.1 zlib/1.3.1 libpsl/0.21.2
Release-Date: [unreleased]
Protocols: dict file ftp ftps gopher gophers http https imap imaps ipfs ipns mqtt pop3 pop3s rtsp smb smbs smtp smtps telnet tftp ws wss
Features: alt-svc AsynchDNS HSTS HTTPS-proxy IPv6 Largefile libz NTLM PSL SSL threadsafe TLS-SRP UnixSockets
[20:57:16]root@curl-t:src
#

```
