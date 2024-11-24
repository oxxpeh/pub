
# codec cpu での比較ログ
## 13th Gen Intel(R) Core(TM) i5-1340P
### 7.1 SVT-AV1(fdcb885 2.3x) crf 40
```
$ ~/ffmpeg -loglevel info  -y  -i ../test.m2ts -c:v libsvtav1 -crf 40  test-av.mp4
ffmpeg version 7.1 Copyright (c) 2000-2024 the FFmpeg developers
  built with gcc 14 (Ubuntu 14.2.0-4ubuntu2)
  configuration: --enable-small --disable-shared --disable-debug --disable-doc --enable-static --pkg-config-flags=--static --extra-libs=-static --extra-cf
lags=--static --enable-nonfree --enable-version3 --enable-gpl --enable-libaribb24 --enable-libfdk-aac --enable-libx264 --enable-libx265 --enable-libsvtav1
 --enable-libdav1d --disable-encoder=aac
  libavutil      59. 39.100 / 59. 39.100
  libavcodec     61. 19.100 / 61. 19.100
  libavformat    61.  7.100 / 61.  7.100
  libavdevice    61.  3.100 / 61.  3.100
  libavfilter    10.  4.100 / 10.  4.100
  libswscale      8.  3.100 /  8.  3.100
  libswresample   5.  3.100 /  5.  3.100
  libpostproc    58.  3.100 / 58.  3.100
Input #0, mpegts, from '../test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #0:0[0x1011]: Video: mpeg2video ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top first), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 tbr, 90k t
bn
      Side data:
        cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #0:1[0x1100]: Audio: aac ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 -> #0:0 (mpeg2video (native) -> av1 (libsvtav1))
  Stream #0:1 -> #0:1 (aac (native) -> aac (libfdk_aac))
Press [q] to stop, [?] for help
Svt[info]: -------------------------------------------
Svt[info]: SVT [version]:       SVT-AV1 Encoder Lib fdcb885
Svt[info]: SVT [build]  :       GCC 14.2.0       64 bit
Svt[info]: LIB Build date: Nov  8 2024 08:04:50
Svt[info]: -------------------------------------------
Svt[info]: Level of Parallelism: 5
Svt[info]: Number of PPCS 76
Svt[info]: [asm level on system : up to avx2]
Svt[info]: [asm level selected : up to avx2]
Svt[info]: -------------------------------------------
Svt[info]: SVT [config]: main profile   tier (auto)     level (auto)
Svt[info]: SVT [config]: width / height / fps numerator / fps denominator               : 1440 / 1080 / 30000 / 1001
Svt[info]: SVT [config]: bit-depth / color format                                       : 8 / YUV420
Svt[info]: SVT [config]: preset / tune / pred struct                                    : 10 / PSNR / random access
Svt[info]: SVT [config]: gop size / mini-gop size / key-frame type                      : 161 / 16 / key frame
Svt[info]: SVT [config]: BRC mode / rate factor                                         : CRF / 40
Svt[info]: SVT [config]: AQ mode / variance boost                                       : 2 / 0
Svt[info]: -------------------------------------------
Output #0, mp4, to 'test-av.mp4':
  Metadata:
    encoder         : Lavf61.7.100
  Stream #0:0: Video: av1 (av01 / 0x31307661), yuv420p(tv, bt709, top coded first (swapped)), 1440x1080 [SAR 4:3 DAR 16:9], q=2-31, 29.97 fps, 30k tbn
      Metadata:
        encoder         : Lavc61.19.100 libsvtav1
  Stream #0:1: Audio: aac (mp4a / 0x6134706D), 48000 Hz, stereo, s16, 139 kb/s
      Metadata:
        encoder         : Lavc61.19.100 libfdk_aac
[out#0/mp4 @ 0x35e01d80] video:8082KiB audio:2047KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: 0.975261%
frame= 3593 fps=233 q=38.0 Lsize=   10227KiB time=00:02:00.00 bitrate= 698.2kbits/s speed=7.79x
```
### 7.0.2 SVT-AV1(2.1.0) crf 40
```
$ ffmpeg -loglevel info  -y  -i ../test.m2ts -c:v libsvtav1 -crf 40  test-av.mp4
ffmpeg version 7.0.2-3ubuntu1 Copyright (c) 2000-2024 the FFmpeg developers
  built with gcc 14 (Ubuntu 14.2.0-2ubuntu1)
  configuration: --prefix=/usr --extra-version=3ubuntu1 --toolchain=hardened --libdir=/usr/lib/x86_64-linux-gnu --incdir=/usr/include/x86_64-linux-gnu --a
rch=amd64 --enable-gpl --disable-stripping --disable-libmfx --disable-omx --enable-gnutls --enable-libaom --enable-libass --enable-libbs2b --enable-libcdi
o --enable-libcodec2 --enable-libdav1d --enable-libflite --enable-libfontconfig --enable-libfreetype --enable-libfribidi --enable-libglslang --enable-libg
me --enable-libgsm --enable-libharfbuzz --enable-libmp3lame --enable-libmysofa --enable-libopenjpeg --enable-libopenmpt --enable-libopus --enable-librubbe
rband --enable-libshine --enable-libsnappy --enable-libsoxr --enable-libspeex --enable-libtheora --enable-libtwolame --enable-libvidstab --enable-libvorbi
s --enable-libvpx --enable-libwebp --enable-libx265 --enable-libxml2 --enable-libxvid --enable-libzimg --enable-openal --enable-opencl --enable-opengl --d
isable-sndio --enable-libvpl --enable-libdc1394 --enable-libdrm --enable-libiec61883 --enable-chromaprint --enable-frei0r --enable-ladspa --enable-libblur
ay --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-libjack --enable-libpulse --enable-librabbitmq --enable-librist --enable-libsrt --enab
le-libssh --enable-libsvtav1 --enable-libx264 --enable-libzmq --enable-libzvbi --enable-lv2 --enable-sdl2 --enable-libplacebo --enable-librav1e --enable-p
ocketsphinx --enable-librsvg --enable-libjxl --enable-shared
  libavutil      59.  8.100 / 59.  8.100
  libavcodec     61.  3.100 / 61.  3.100
  libavformat    61.  1.100 / 61.  1.100
  libavdevice    61.  1.100 / 61.  1.100
  libavfilter    10.  1.100 / 10.  1.100
  libswscale      8.  1.100 /  8.  1.100
  libswresample   5.  1.100 /  5.  1.100
  libpostproc    58.  1.100 / 58.  1.100
Input #0, mpegts, from '../test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #0:0[0x1011]: Video: mpeg2video (Main) ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top first), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 tbr
, 90k tbn
      Side data:
        cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #0:1[0x1100]: Audio: aac (LC) ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 -> #0:0 (mpeg2video (native) -> av1 (libsvtav1))
  Stream #0:1 -> #0:1 (aac (native) -> aac (native))
Press [q] to stop, [?] for help
Svt[info]: -------------------------------------------
Svt[info]: SVT [version]:       SVT-AV1 Encoder Lib v2.1.0
Svt[info]: SVT [build]  :       GCC 13.3.0       64 bit
Svt[info]: -------------------------------------------
Svt[info]: Number of logical cores available: 16
Svt[info]: Number of PPCS 76
Svt[info]: [asm level on system : up to avx2]
Svt[info]: [asm level selected : up to avx2]
Svt[info]: -------------------------------------------
Svt[info]: SVT [config]: main profile   tier (auto)     level (auto)
Svt[info]: SVT [config]: width / height / fps numerator / fps denominator               : 1440 / 1080 / 30000 / 1001
Svt[info]: SVT [config]: bit-depth / color format                                       : 8 / YUV420
Svt[info]: SVT [config]: preset / tune / pred struct                                    : 10 / PSNR / random access
Svt[info]: SVT [config]: gop size / mini-gop size / key-frame type                      : 161 / 16 / key frame
Svt[info]: SVT [config]: BRC mode / rate factor                                         : CRF / 40
Svt[info]: SVT [config]: AQ mode / variance boost                                       : 2 / 0
Svt[info]: -------------------------------------------
Output #0, mp4, to 'test-av.mp4':
  Metadata:
    encoder         : Lavf61.1.100
  Stream #0:0: Video: av1 (av01 / 0x31307661), yuv420p(tv, bt709, top coded first (swapped)), 1440x1080 [SAR 4:3 DAR 16:9], q=2-31, 29.97 fps, 30k tbn
      Metadata:
        encoder         : Lavc61.3.100 libsvtav1
  Stream #0:1: Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 128 kb/s
      Metadata:
        encoder         : Lavc61.3.100 aac
[out#0/mp4 @ 0x5e3894d390c0] video:8214KiB audio:1919KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: 0.975552%
frame= 3600 fps=165 q=40.0 Lsize=   10232KiB time=00:02:00.00 bitrate= 698.5kbits/s dup=7 drop=0 speed=5.52x
[aac @ 0x5e3894feabc0] Qavg: 1421.507
```
### 6.1.2 SVT-AV1(c642bb0 2.3x) crf 40
```
~/ffmpeg-6a -loglevel info  -y -i ../test.m2ts -c:v libsvtav1 -crf 40 6test.mp4
ffmpeg version 6.1.2 Copyright (c) 2000-2024 the FFmpeg developers
  built with gcc 14 (Ubuntu 14.2.0-4ubuntu2)
  configuration: --enable-small --disable-shared --disable-debug --disable-doc --enable-static --pkg-config-flags=--static --extra-libs=-static --extra-cf
lags=--static --enable-nonfree --enable-version3 --enable-gpl --enable-libaribb24 --enable-libdav1d --enable-libfdk-aac --enable-libsvtav1 --enable-libx26
4 --enable-libx265 --disable-encoder=aac
  libavutil      58. 29.100 / 58. 29.100
  libavcodec     60. 31.102 / 60. 31.102
  libavformat    60. 16.100 / 60. 16.100
  libavdevice    60.  3.100 / 60.  3.100
  libavfilter     9. 12.100 /  9. 12.100
  libswscale      7.  5.100 /  7.  5.100
  libswresample   4. 12.100 /  4. 12.100
  libpostproc    57.  3.100 / 57.  3.100
Input #0, mpegts, from '../test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #0:0[0x1011]: Video: mpeg2video ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top first), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 tbr, 90k t
bn
    Side data:
      cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #0:1[0x1100]: Audio: aac ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 -> #0:0 (mpeg2video (native) -> av1 (libsvtav1))
  Stream #0:1 -> #0:1 (aac (native) -> aac (libfdk_aac))
Press [q] to stop, [?] for help
Svt[info]: -------------------------------------------
Svt[info]: SVT [version]:       SVT-AV1 Encoder Lib c642bb0
Svt[info]: SVT [build]  :       GCC 14.2.0       64 bit
Svt[info]: LIB Build date: Nov 23 2024 17:13:16
Svt[info]: -------------------------------------------
Svt[info]: Level of Parallelism: 5
Svt[info]: Number of PPCS 76
Svt[info]: [asm level on system : up to avx2]
Svt[info]: [asm level selected : up to avx2]
Svt[info]: -------------------------------------------
Svt[info]: SVT [config]: main profile   tier (auto)     level (auto)
Svt[info]: SVT [config]: width / height / fps numerator / fps denominator               : 1440 / 1080 / 30000 / 1001
Svt[info]: SVT [config]: bit-depth / color format                                       : 8 / YUV420
Svt[info]: SVT [config]: preset / tune / pred struct                                    : 10 / PSNR / random access
Svt[info]: SVT [config]: gop size / mini-gop size / key-frame type                      : 161 / 16 / key frame
Svt[info]: SVT [config]: BRC mode / rate factor                                         : CRF / 40
Svt[info]: SVT [config]: AQ mode / variance boost                                       : 2 / 0
Svt[info]: -------------------------------------------
Output #0, mp4, to '6test.mp4':
  Metadata:
    encoder         : Lavf60.16.100
  Stream #0:0: Video: av1 (av01 / 0x31307661), yuv420p(tv, bt709, top coded first (swapped)), 1440x1080 [SAR 4:3 DAR 16:9], q=2-31, 29.97 fps, 30k tbn
    Metadata:
      encoder         : Lavc60.31.102 libsvtav1
  Stream #0:1: Audio: aac (mp4a / 0x6134706D), 48000 Hz, stereo, s16, 139 kb/s
    Metadata:
      encoder         : Lavc60.31.102 libfdk_aac
[out#0/mp4 @ 0x1f3e7880] video:8075kB audio:2047kB subtitle:0kB other streams:0kB global headers:0kB muxing overhead: 0.976553%
frame= 3600 fps=249 q=40.0 Lsize=   10221kB time=00:02:00.08 bitrate= 697.2kbits/s dup=7 drop=0 speed=8.29x
```
### 6.1.2 SVT-AV1(2.1) crf 40
```
~/ffmpeg-6a0 -loglevel info  -y -i ../test.m2ts -c:v libsvtav1 -crf 40 6test0.mp4
ffmpeg version 6.1.2 Copyright (c) 2000-2024 the FFmpeg developers
  built with gcc 14 (Ubuntu 14.2.0-4ubuntu2)
  configuration: --enable-small --disable-shared --disable-debug --disable-doc --enable-static --pkg-config-flags=--static --extra-libs=-static --extra-cf
lags=--static --enable-nonfree --enable-version3 --enable-gpl --enable-libaribb24 --enable-libdav1d --enable-libfdk-aac --enable-libsvtav1 --enable-libx26
4 --enable-libx265 --disable-encoder=aac
  libavutil      58. 29.100 / 58. 29.100
  libavcodec     60. 31.102 / 60. 31.102
  libavformat    60. 16.100 / 60. 16.100
  libavdevice    60.  3.100 / 60.  3.100
  libavfilter     9. 12.100 /  9. 12.100
  libswscale      7.  5.100 /  7.  5.100
  libswresample   4. 12.100 /  4. 12.100
  libpostproc    57.  3.100 / 57.  3.100
Input #0, mpegts, from '../test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #0:0[0x1011]: Video: mpeg2video ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top first), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 tbr, 90k t
bn
    Side data:
      cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #0:1[0x1100]: Audio: aac ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 -> #0:0 (mpeg2video (native) -> av1 (libsvtav1))
  Stream #0:1 -> #0:1 (aac (native) -> aac (libfdk_aac))
Press [q] to stop, [?] for help
Svt[info]: -------------------------------------------
Svt[info]: SVT [version]:       SVT-AV1 Encoder Lib v2.1.0
Svt[info]: SVT [build]  :       GCC 14.2.0       64 bit
Svt[info]: LIB Build date: Nov 23 2024 18:08:10
Svt[info]: -------------------------------------------
Svt[info]: Number of logical cores available: 16
Svt[info]: Number of PPCS 76
Svt[info]: [asm level on system : up to avx2]
Svt[info]: [asm level selected : up to avx2]
Svt[info]: -------------------------------------------
Svt[info]: SVT [config]: main profile   tier (auto)     level (auto)
Svt[info]: SVT [config]: width / height / fps numerator / fps denominator               : 1440 / 1080 / 30000 / 1001
Svt[info]: SVT [config]: bit-depth / color format                                       : 8 / YUV420
Svt[info]: SVT [config]: preset / tune / pred struct                                    : 10 / PSNR / random access
Svt[info]: SVT [config]: gop size / mini-gop size / key-frame type                      : 161 / 16 / key frame
Svt[info]: SVT [config]: BRC mode / rate factor                                         : CRF / 40
Svt[info]: SVT [config]: AQ mode / variance boost                                       : 2 / 0
Svt[info]: -------------------------------------------
Output #0, mp4, to '6test0.mp4':
  Metadata:
    encoder         : Lavf60.16.100
  Stream #0:0: Video: av1 (av01 / 0x31307661), yuv420p(tv, bt709, top coded first (swapped)), 1440x1080 [SAR 4:3 DAR 16:9], q=2-31, 29.97 fps, 30k tbn
    Metadata:
      encoder         : Lavc60.31.102 libsvtav1
  Stream #0:1: Audio: aac (mp4a / 0x6134706D), 48000 Hz, stereo, s16, 139 kb/s
    Metadata:
      encoder         : Lavc60.31.102 libfdk_aac
[out#0/mp4 @ 0x326da880] video:8214kB audio:2047kB subtitle:0kB other streams:0kB global headers:0kB muxing overhead: 0.963343%
frame= 3600 fps=193 q=40.0 Lsize=   10359kB time=00:02:00.08 bitrate= 706.7kbits/s dup=7 drop=0 speed=6.44x
```
## windows i7-4770s
### 7.0.1 SVT-AV1 crf 40
```
$ ffmpeg-701.exe -loglevel info  -y -i ../test.m2ts -c:v libsvtav1 -crf 40 testx.mp4
ffmpeg version n7.0.1-ffmpeg-windows-build-helpers Copyright (c) 2000-2024 the FFmpeg developers
  built with gcc 10.2.0 (GCC)
  configuration: --pkg-config=pkg-config --pkg-config-flags=--static --extra-version=ffmpeg-windows-build-helpers --enable-version3 --disable-debug --disable-w3
2threads --arch=x86_64 --target-os=mingw32 --cross-prefix=/home/nyobita/ffmpeg-windows-build-helpers/sandbox/cross_compilers/mingw-w64-x86_64/bin/x86_64-w64-min
gw32- --enable-libcaca --enable-gray --enable-libtesseract --enable-fontconfig --enable-gmp --enable-libass --enable-libbluray --enable-libbs2b --enable-libflit
e --enable-libfreetype --enable-libfribidi --enable-libgme --enable-libgsm --enable-libilbc --enable-libmodplug --enable-libmp3lame --enable-libopencore-amrnb -
-enable-libopencore-amrwb --enable-libopus --enable-libsnappy --enable-libsoxr --enable-libspeex --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc
--enable-libvorbis --enable-libwebp --enable-libzimg --enable-libzvbi --enable-libmysofa --enable-libopenjpeg --enable-libopenh264 --enable-libvmaf --enable-lib
srt --enable-libxml2 --enable-opengl --enable-libdav1d --enable-gnutls --enable-libsvtav1 --enable-libvpx --enable-libaom --enable-nvenc --enable-nvdec --extra-
libs=-lz --extra-libs=-lpng --extra-libs=-lm --extra-libs=-lfreetype --extra-libs=-lshlwapi --extra-libs=-lmpg123 --extra-libs=-lpthread --extra-cflags=-DLIBTWO
LAME_STATIC --extra-cflags=-DMODPLUG_STATIC --extra-cflags=-DCACA_STATIC --enable-amf --enable-libmfx --enable-libaribcaption --enable-gpl --enable-frei0r --ena
ble-librubberband --enable-libvidstab --enable-libx264 --enable-libx265 --enable-avisynth --enable-libaribb24 --enable-libxvid --enable-libdavs2 --enable-libxav
s2 --enable-libxavs --extra-cflags='-mtune=generic' --extra-cflags=-O3 --enable-static --disable-shared --prefix=/home/nyobita/ffmpeg-windows-build-helpers/sand
box/cross_compilers/mingw-w64-x86_64/x86_64-w64-mingw32 --enable-nonfree --enable-libfdk-aac --enable-decklink
  libavutil      59.  8.100 / 59.  8.100
  libavcodec     61.  3.100 / 61.  3.100
  libavformat    61.  1.100 / 61.  1.100
  libavdevice    61.  1.100 / 61.  1.100
  libavfilter    10.  1.100 / 10.  1.100
  libswscale      8.  1.100 /  8.  1.100
  libswresample   5.  1.100 /  5.  1.100
  libpostproc    58.  1.100 / 58.  1.100
Input #0, mpegts, from '../test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #0:0[0x1011]: Video: mpeg2video (Main) ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top first), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 tbr, 90k
tbn
      Side data:
        cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #0:1[0x1100]: Audio: aac (LC) ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 -> #0:0 (mpeg2video (native) -> av1 (libsvtav1))
  Stream #0:1 -> #0:1 (aac (native) -> aac (native))
Press [q] to stop, [?] for help
Svt[info]: -------------------------------------------
Svt[info]: SVT [version]:       SVT-AV1 Encoder Lib v2.1.2-52-gb13aec2a
Svt[info]: SVT [build]  :       GCC 10.2.0       64 bit
Svt[info]: LIB Build date: Jul 22 2024 06:01:09
Svt[info]: -------------------------------------------
Svt[info]: Number of logical cores available: 8
Svt[info]: Number of PPCS 59
Svt[info]: [asm level on system : up to avx2]
Svt[info]: [asm level selected : up to avx2]
Svt[info]: -------------------------------------------
Svt[info]: SVT [config]: main profile   tier (auto)     level (auto)
Svt[info]: SVT [config]: width / height / fps numerator / fps denominator               : 1440 / 1080 / 30000 / 1001
Svt[info]: SVT [config]: bit-depth / color format                                       : 8 / YUV420
Svt[info]: SVT [config]: preset / tune / pred struct                                    : 10 / PSNR / random access
Svt[info]: SVT [config]: gop size / mini-gop size / key-frame type                      : 161 / 16 / key frame
Svt[info]: SVT [config]: BRC mode / rate factor                                         : CRF / 40
Svt[info]: SVT [config]: AQ mode / variance boost                                       : 2 / 0
Svt[info]: -------------------------------------------
Output #0, mp4, to 'testx.mp4':
  Metadata:
    encoder         : Lavf61.1.100
  Stream #0:0: Video: av1 (av01 / 0x31307661), yuv420p(tv, bt709, top coded first (swapped)), 1440x1080 [SAR 4:3 DAR 16:9], q=2-31, 29.97 fps, 30k tbn
      Metadata:
        encoder         : Lavc61.3.100 libsvtav1
  Stream #0:1: Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 128 kb/s
      Metadata:
        encoder         : Lavc61.3.100 aac
[out#0/mp4 @ 00000238256dc140] video:8331KiB audio:1920KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: 0.964304%
frame= 3600 fps= 80 q=40.0 Lsize=   10350KiB time=00:02:00.00 bitrate= 706.6kbits/s dup=7 drop=0 speed=2.65x
[aac @ 0000023824eeda80] Qavg: 1423.164
```
### 7.1 SVT-AV1 crf 40
```
$ ffmpeg-7.1.exe -loglevel info  -y -i ../test.m2ts -c:v libsvtav1 -crf 40 testx.mp4
ffmpeg version N-117568-g31b5b3badc-20241016 Copyright (c) 2000-2024 the FFmpeg developers
  built with gcc 14.2.0 (crosstool-NG 1.26.0.120_4d36f27)
  configuration: --prefix=/ffbuild/prefix --pkg-config-flags=--static --pkg-config=pkg-config --cross-prefix=x86_64-w64-mingw32- --arch=x86_64 --target-os=mingw
32 --enable-gpl --enable-version3 --disable-debug --disable-w32threads --enable-pthreads --enable-iconv --enable-zlib --enable-libfreetype --enable-libfribidi -
-enable-gmp --enable-libxml2 --enable-lzma --enable-fontconfig --enable-libharfbuzz --enable-libvorbis --enable-opencl --disable-libpulse --enable-libvmaf --dis
able-libxcb --disable-xlib --enable-amf --enable-libaom --enable-libaribb24 --enable-avisynth --enable-chromaprint --enable-libdav1d --enable-libdavs2 --enable-
libdvdread --enable-libdvdnav --disable-libfdk-aac --enable-ffnvcodec --enable-cuda-llvm --enable-frei0r --enable-libgme --enable-libkvazaar --enable-libaribcap
tion --enable-libass --enable-libbluray --enable-libjxl --enable-libmp3lame --enable-libopus --enable-librist --enable-libssh --enable-libtheora --enable-libvpx
 --enable-libwebp --enable-libzmq --enable-lv2 --enable-libvpl --enable-openal --enable-libopencore-amrnb --enable-libopencore-amrwb --enable-libopenh264 --enab
le-libopenjpeg --enable-libopenmpt --enable-librav1e --enable-librubberband --enable-schannel --enable-sdl2 --enable-libsoxr --enable-libsrt --enable-libsvtav1
--enable-libtwolame --enable-libuavs3d --disable-libdrm --enable-vaapi --enable-libvidstab --enable-vulkan --enable-libshaderc --enable-libplacebo --enable-libv
venc --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxvid --enable-libzimg --enable-libzvbi --extra-cflags=-DLIBTWOLAME_STATIC --extra-cxxflags=
 --extra-libs=-lgomp --extra-ldflags=-pthread --extra-ldexeflags= --cc=x86_64-w64-mingw32-gcc --cxx=x86_64-w64-mingw32-g++ --ar=x86_64-w64-mingw32-gcc-ar --ranl
ib=x86_64-w64-mingw32-gcc-ranlib --nm=x86_64-w64-mingw32-gcc-nm --extra-version=20241016
  libavutil      59. 44.100 / 59. 44.100
  libavcodec     61. 22.100 / 61. 22.100
  libavformat    61.  9.100 / 61.  9.100
  libavdevice    61.  4.100 / 61.  4.100
  libavfilter    10.  6.100 / 10.  6.100
  libswscale      8.  6.100 /  8.  6.100
  libswresample   5.  4.100 /  5.  4.100
  libpostproc    58.  4.100 / 58.  4.100
Input #0, mpegts, from '../test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #0:0[0x1011]: Video: mpeg2video (Main) ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top first), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 tbr, 90k
tbn
    Side data:
      cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #0:1[0x1100]: Audio: aac (LC) ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 -> #0:0 (mpeg2video (native) -> av1 (libsvtav1))
  Stream #0:1 -> #0:1 (aac (native) -> aac (native))
Press [q] to stop, [?] for help
Svt[info]: -------------------------------------------
Svt[info]: SVT [version]:       SVT-AV1 Encoder Lib v2.2.1-116-g13a54d08
Svt[info]: SVT [build]  :       GCC 14.2.0       64 bit
Svt[info]: LIB Build date: Oct 16 2024 16:37:39
Svt[info]: -------------------------------------------
Svt[info]: Number of logical cores available: 8
Svt[info]: Number of PPCS 59
Svt[info]: [asm level on system : up to avx2]
Svt[info]: [asm level selected : up to avx2]
Svt[info]: -------------------------------------------
Svt[info]: SVT [config]: main profile   tier (auto)     level (auto)
Svt[info]: SVT [config]: width / height / fps numerator / fps denominator               : 1440 / 1080 / 30000 / 1001
Svt[info]: SVT [config]: bit-depth / color format                                       : 8 / YUV420
Svt[info]: SVT [config]: preset / tune / pred struct                                    : 10 / PSNR / random access
Svt[info]: SVT [config]: gop size / mini-gop size / key-frame type                      : 161 / 16 / key frame
Svt[info]: SVT [config]: BRC mode / rate factor                                         : CRF / 40
Svt[info]: SVT [config]: AQ mode / variance boost                                       : 2 / 0
Svt[info]: -------------------------------------------
Output #0, mp4, to 'testx.mp4':
  Metadata:
    encoder         : Lavf61.9.100
  Stream #0:0: Video: av1 (av01 / 0x31307661), yuv420p(tv, bt709, top coded first (swapped)), 1440x1080 [SAR 4:3 DAR 16:9], q=2-31, 29.97 fps, 30k tbn
    Metadata:
      encoder         : Lavc61.22.100 libsvtav1
  Stream #0:1: Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 128 kb/s
    Metadata:
      encoder         : Lavc61.22.100 aac
[out#0/mp4 @ 0000020faac20280] video:8082KiB audio:1919KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: 0.987717%
frame= 3593 fps=115 q=38.0 Lsize=   10099KiB time=00:02:00.00 bitrate= 689.4kbits/s speed=3.84x
[aac @ 0000020facbda2c0] Qavg: 1420.256
```
## win i5-8500(GTX 1080)
### 7.1 hevc_nvenc
```
$ ffmpeg-7.1.exe -y -loglevel info   -i ../test.m2ts -c:v hevc_nvenc  test-
nv5.mp4
ffmpeg version N-117568-g31b5b3badc-20241016 Copyright (c) 2000-2024 the FFmpeg developers
  built with gcc 14.2.0 (crosstool-NG 1.26.0.120_4d36f27)
  configuration: --prefix=/ffbuild/prefix --pkg-config-flags=--static --pkg-config=pkg-config --cros
s-prefix=x86_64-w64-mingw32- --arch=x86_64 --target-os=mingw32 --enable-gpl --enable-version3 --disa
ble-debug --disable-w32threads --enable-pthreads --enable-iconv --enable-zlib --enable-libfreetype -
-enable-libfribidi --enable-gmp --enable-libxml2 --enable-lzma --enable-fontconfig --enable-libharfb
uzz --enable-libvorbis --enable-opencl --disable-libpulse --enable-libvmaf --disable-libxcb --disabl
e-xlib --enable-amf --enable-libaom --enable-libaribb24 --enable-avisynth --enable-chromaprint --ena
ble-libdav1d --enable-libdavs2 --enable-libdvdread --enable-libdvdnav --disable-libfdk-aac --enable-
ffnvcodec --enable-cuda-llvm --enable-frei0r --enable-libgme --enable-libkvazaar --enable-libaribcap
tion --enable-libass --enable-libbluray --enable-libjxl --enable-libmp3lame --enable-libopus --enabl
e-librist --enable-libssh --enable-libtheora --enable-libvpx --enable-libwebp --enable-libzmq --enab
le-lv2 --enable-libvpl --enable-openal --enable-libopencore-amrnb --enable-libopencore-amrwb --enabl
e-libopenh264 --enable-libopenjpeg --enable-libopenmpt --enable-librav1e --enable-librubberband --en
able-schannel --enable-sdl2 --enable-libsoxr --enable-libsrt --enable-libsvtav1 --enable-libtwolame
--enable-libuavs3d --disable-libdrm --enable-vaapi --enable-libvidstab --enable-vulkan --enable-libs
haderc --enable-libplacebo --enable-libvvenc --enable-libx264 --enable-libx265 --enable-libxavs2 --e
nable-libxvid --enable-libzimg --enable-libzvbi --extra-cflags=-DLIBTWOLAME_STATIC --extra-cxxflags=
 --extra-libs=-lgomp --extra-ldflags=-pthread --extra-ldexeflags= --cc=x86_64-w64-mingw32-gcc --cxx=
x86_64-w64-mingw32-g++ --ar=x86_64-w64-mingw32-gcc-ar --ranlib=x86_64-w64-mingw32-gcc-ranlib --nm=x8
6_64-w64-mingw32-gcc-nm --extra-version=20241016
  libavutil      59. 44.100 / 59. 44.100
  libavcodec     61. 22.100 / 61. 22.100
  libavformat    61.  9.100 / 61.  9.100
  libavdevice    61.  4.100 / 61.  4.100
  libavfilter    10.  6.100 / 10.  6.100
  libswscale      8.  6.100 /  8.  6.100
  libswresample   5.  4.100 /  5.  4.100
  libpostproc    58.  4.100 / 58.  4.100
Input #0, mpegts, from '../test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #0:0[0x1011]: Video: mpeg2video (Main) ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top firs
t), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 tbr, 90k tbn
    Side data:
      cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #0:1[0x1100]: Audio: aac (LC) ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 -> #0:0 (mpeg2video (native) -> hevc (hevc_nvenc))
  Stream #0:1 -> #0:1 (aac (native) -> aac (native))
Press [q] to stop, [?] for help
Output #0, mp4, to 'test-nv5.mp4':
  Metadata:
    encoder         : Lavf61.9.100
  Stream #0:0: Video: hevc (Main) (hev1 / 0x31766568), yuv420p(tv, bt709, top coded first (swapped))
, 1440x1080 [SAR 4:3 DAR 16:9], q=2-31, 2000 kb/s, 29.97 fps, 30k tbn
    Metadata:
      encoder         : Lavc61.22.100 hevc_nvenc
    Side data:
      cpb: bitrate max/min/avg: 0/0/2000000 buffer size: 4000000 vbv_delay: N/A
  Stream #0:1: Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 128 kb/s
    Metadata:
      encoder         : Lavc61.22.100 aac
[out#0/mp4 @ 000002080ab5e680] video:31217KiB audio:1919KiB subtitle:0KiB other streams:0KiB global
headers:0KiB muxing overhead: 0.308851%
frame= 3593 fps=546 q=27.0 Lsize=   33238KiB time=00:02:00.00 bitrate=2269.1kbits/s speed=18.2x
[aac @ 000002080ca79bc0] Qavg: 1420.256
```
### 7.1 h264_nvenc
```
$ ffmpeg-7.1.exe -y -loglevel info   -i ../test.m2ts -c:v h264_nvenc  test-
nv4.mp4
ffmpeg version N-117568-g31b5b3badc-20241016 Copyright (c) 2000-2024 the FFmpeg developers
  built with gcc 14.2.0 (crosstool-NG 1.26.0.120_4d36f27)
  configuration: --prefix=/ffbuild/prefix --pkg-config-flags=--static --pkg-config=pkg-config --cros
s-prefix=x86_64-w64-mingw32- --arch=x86_64 --target-os=mingw32 --enable-gpl --enable-version3 --disa
ble-debug --disable-w32threads --enable-pthreads --enable-iconv --enable-zlib --enable-libfreetype -
-enable-libfribidi --enable-gmp --enable-libxml2 --enable-lzma --enable-fontconfig --enable-libharfb
uzz --enable-libvorbis --enable-opencl --disable-libpulse --enable-libvmaf --disable-libxcb --disabl
e-xlib --enable-amf --enable-libaom --enable-libaribb24 --enable-avisynth --enable-chromaprint --ena
ble-libdav1d --enable-libdavs2 --enable-libdvdread --enable-libdvdnav --disable-libfdk-aac --enable-
ffnvcodec --enable-cuda-llvm --enable-frei0r --enable-libgme --enable-libkvazaar --enable-libaribcap
tion --enable-libass --enable-libbluray --enable-libjxl --enable-libmp3lame --enable-libopus --enabl
e-librist --enable-libssh --enable-libtheora --enable-libvpx --enable-libwebp --enable-libzmq --enab
le-lv2 --enable-libvpl --enable-openal --enable-libopencore-amrnb --enable-libopencore-amrwb --enabl
e-libopenh264 --enable-libopenjpeg --enable-libopenmpt --enable-librav1e --enable-librubberband --en
able-schannel --enable-sdl2 --enable-libsoxr --enable-libsrt --enable-libsvtav1 --enable-libtwolame
--enable-libuavs3d --disable-libdrm --enable-vaapi --enable-libvidstab --enable-vulkan --enable-libs
haderc --enable-libplacebo --enable-libvvenc --enable-libx264 --enable-libx265 --enable-libxavs2 --e
nable-libxvid --enable-libzimg --enable-libzvbi --extra-cflags=-DLIBTWOLAME_STATIC --extra-cxxflags=
 --extra-libs=-lgomp --extra-ldflags=-pthread --extra-ldexeflags= --cc=x86_64-w64-mingw32-gcc --cxx=
x86_64-w64-mingw32-g++ --ar=x86_64-w64-mingw32-gcc-ar --ranlib=x86_64-w64-mingw32-gcc-ranlib --nm=x8
6_64-w64-mingw32-gcc-nm --extra-version=20241016
  libavutil      59. 44.100 / 59. 44.100
  libavcodec     61. 22.100 / 61. 22.100
  libavformat    61.  9.100 / 61.  9.100
  libavdevice    61.  4.100 / 61.  4.100
  libavfilter    10.  6.100 / 10.  6.100
  libswscale      8.  6.100 /  8.  6.100
  libswresample   5.  4.100 /  5.  4.100
  libpostproc    58.  4.100 / 58.  4.100
Input #0, mpegts, from '../test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #0:0[0x1011]: Video: mpeg2video (Main) ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top firs
t), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 tbr, 90k tbn
    Side data:
      cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #0:1[0x1100]: Audio: aac (LC) ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 -> #0:0 (mpeg2video (native) -> h264 (h264_nvenc))
  Stream #0:1 -> #0:1 (aac (native) -> aac (native))
Press [q] to stop, [?] for help
Output #0, mp4, to 'test-nv4.mp4':
  Metadata:
    encoder         : Lavf61.9.100
  Stream #0:0: Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, top coded first (swapped))
, 1440x1080 [SAR 4:3 DAR 16:9], q=2-31, 2000 kb/s, 29.97 fps, 30k tbn
    Metadata:
      encoder         : Lavc61.22.100 h264_nvenc
    Side data:
      cpb: bitrate max/min/avg: 0/0/2000000 buffer size: 4000000 vbv_delay: N/A
  Stream #0:1: Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 128 kb/s
    Metadata:
      encoder         : Lavc61.22.100 aac
[out#0/mp4 @ 000001b3f8e0cbc0] video:29265KiB audio:1919KiB subtitle:0KiB other streams:0KiB global
headers:0KiB muxing overhead: 0.417688%
frame= 3593 fps=456 q=30.0 Lsize=   31314KiB time=00:01:59.95 bitrate=2138.5kbits/s speed=15.2x
[aac @ 000001b3fabcba80] Qavg: 1420.256
```
### vmaf h264_nvenc
```
$ ffmpeg-7.1.exe -i test-nv4.mp4 -i ../test.m2ts -lavfi libvmaf='model=version=vmaf_v0.6.1' -f null
-
ffmpeg version N-117568-g31b5b3badc-20241016 Copyright (c) 2000-2024 the FFmpeg developers
  built with gcc 14.2.0 (crosstool-NG 1.26.0.120_4d36f27)
  configuration: --prefix=/ffbuild/prefix --pkg-config-flags=--static --pkg-config=pkg-config --cros
s-prefix=x86_64-w64-mingw32- --arch=x86_64 --target-os=mingw32 --enable-gpl --enable-version3 --disa
ble-debug --disable-w32threads --enable-pthreads --enable-iconv --enable-zlib --enable-libfreetype -
-enable-libfribidi --enable-gmp --enable-libxml2 --enable-lzma --enable-fontconfig --enable-libharfb
uzz --enable-libvorbis --enable-opencl --disable-libpulse --enable-libvmaf --disable-libxcb --disabl
e-xlib --enable-amf --enable-libaom --enable-libaribb24 --enable-avisynth --enable-chromaprint --ena
ble-libdav1d --enable-libdavs2 --enable-libdvdread --enable-libdvdnav --disable-libfdk-aac --enable-
ffnvcodec --enable-cuda-llvm --enable-frei0r --enable-libgme --enable-libkvazaar --enable-libaribcap
tion --enable-libass --enable-libbluray --enable-libjxl --enable-libmp3lame --enable-libopus --enabl
e-librist --enable-libssh --enable-libtheora --enable-libvpx --enable-libwebp --enable-libzmq --enab
le-lv2 --enable-libvpl --enable-openal --enable-libopencore-amrnb --enable-libopencore-amrwb --enabl
e-libopenh264 --enable-libopenjpeg --enable-libopenmpt --enable-librav1e --enable-librubberband --en
able-schannel --enable-sdl2 --enable-libsoxr --enable-libsrt --enable-libsvtav1 --enable-libtwolame
--enable-libuavs3d --disable-libdrm --enable-vaapi --enable-libvidstab --enable-vulkan --enable-libs
haderc --enable-libplacebo --enable-libvvenc --enable-libx264 --enable-libx265 --enable-libxavs2 --e
nable-libxvid --enable-libzimg --enable-libzvbi --extra-cflags=-DLIBTWOLAME_STATIC --extra-cxxflags=
 --extra-libs=-lgomp --extra-ldflags=-pthread --extra-ldexeflags= --cc=x86_64-w64-mingw32-gcc --cxx=
x86_64-w64-mingw32-g++ --ar=x86_64-w64-mingw32-gcc-ar --ranlib=x86_64-w64-mingw32-gcc-ranlib --nm=x8
6_64-w64-mingw32-gcc-nm --extra-version=20241016
  libavutil      59. 44.100 / 59. 44.100
  libavcodec     61. 22.100 / 61. 22.100
  libavformat    61.  9.100 / 61.  9.100
  libavdevice    61.  4.100 / 61.  4.100
  libavfilter    10.  6.100 / 10.  6.100
  libswscale      8.  6.100 /  8.  6.100
  libswresample   5.  4.100 /  5.  4.100
  libpostproc    58.  4.100 / 58.  4.100
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'test-nv4.mp4':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2avc1mp41
    encoder         : Lavf61.9.100
  Duration: 00:02:00.05, start: 0.000000, bitrate: 2136 kb/s
  Stream #0:0[0x1](und): Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 14
40x1080 [SAR 4:3 DAR 16:9], 1999 kb/s, 29.97 fps, 29.97 tbr, 30k tbn (default)
    Metadata:
      handler_name    : VideoHandler
      vendor_id       : [0][0][0][0]
      encoder         : Lavc61.22.100 h264_nvenc
  Stream #0:1[0x2](und): Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 130 kb/s (defa
ult)
    Metadata:
      handler_name    : SoundHandler
      vendor_id       : [0][0][0][0]
Input #1, mpegts, from '../test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #1:0[0x1011]: Video: mpeg2video (Main) ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top firs
t), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 tbr, 90k tbn
    Side data:
      cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #1:1[0x1100]: Audio: aac (LC) ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 (h264) -> libvmaf
  Stream #1:0 (mpeg2video) -> libvmaf
  libvmaf:default -> Stream #0:0 (wrapped_avframe)
  Stream #0:1 -> #0:1 (aac (native) -> pcm_s16le (native))
Press [q] to stop, [?] for help
Output #0, null, to 'pipe:':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2avc1mp41
    encoder         : Lavf61.9.100
  Stream #0:0: Video: wrapped_avframe, yuv420p(tv, bt709, progressive), 1440x1080 [SAR 4:3 DAR 16:9]
, q=2-31, 200 kb/s, 29.97 fps, 29.97 tbn
    Metadata:
      encoder         : Lavc61.22.100 wrapped_avframe
  Stream #0:1(und): Audio: pcm_s16le, 48000 Hz, stereo, s16, 1536 kb/s (default)
    Metadata:
      encoder         : Lavc61.22.100 pcm_s16le
      handler_name    : SoundHandler
      vendor_id       : [0][0][0][0]
[Parsed_libvmaf_0 @ 000001fdbabf08c0] VMAF score: 60.130479e=N/A speed=0.503x
[out#0/null @ 000001fdbabefe40] video:1544KiB audio:22500KiB subtitle:0KiB other streams:0KiB global
 headers:0KiB muxing overhead: unknown
frame= 3593 fps= 15 q=-0.0 Lsize=N/A time=00:02:00.00 bitrate=N/A speed=0.503x
```
### vmaf hevc_nvenc
```
$ ffmpeg-7.1.exe -loglevel info  -i test-nv5.mp4 -i ../test.m2ts -lavfi lib
vmaf='model=version=vmaf_v0.6.1' -f null -
ffmpeg version N-117568-g31b5b3badc-20241016 Copyright (c) 2000-2024 the FFmpeg developers
  built with gcc 14.2.0 (crosstool-NG 1.26.0.120_4d36f27)
  configuration: --prefix=/ffbuild/prefix --pkg-config-flags=--static --pkg-config=pkg-config --cros
s-prefix=x86_64-w64-mingw32- --arch=x86_64 --target-os=mingw32 --enable-gpl --enable-version3 --disa
ble-debug --disable-w32threads --enable-pthreads --enable-iconv --enable-zlib --enable-libfreetype -
-enable-libfribidi --enable-gmp --enable-libxml2 --enable-lzma --enable-fontconfig --enable-libharfb
uzz --enable-libvorbis --enable-opencl --disable-libpulse --enable-libvmaf --disable-libxcb --disabl
e-xlib --enable-amf --enable-libaom --enable-libaribb24 --enable-avisynth --enable-chromaprint --ena
ble-libdav1d --enable-libdavs2 --enable-libdvdread --enable-libdvdnav --disable-libfdk-aac --enable-
ffnvcodec --enable-cuda-llvm --enable-frei0r --enable-libgme --enable-libkvazaar --enable-libaribcap
tion --enable-libass --enable-libbluray --enable-libjxl --enable-libmp3lame --enable-libopus --enabl
e-librist --enable-libssh --enable-libtheora --enable-libvpx --enable-libwebp --enable-libzmq --enab
le-lv2 --enable-libvpl --enable-openal --enable-libopencore-amrnb --enable-libopencore-amrwb --enabl
e-libopenh264 --enable-libopenjpeg --enable-libopenmpt --enable-librav1e --enable-librubberband --en
able-schannel --enable-sdl2 --enable-libsoxr --enable-libsrt --enable-libsvtav1 --enable-libtwolame
--enable-libuavs3d --disable-libdrm --enable-vaapi --enable-libvidstab --enable-vulkan --enable-libs
haderc --enable-libplacebo --enable-libvvenc --enable-libx264 --enable-libx265 --enable-libxavs2 --e
nable-libxvid --enable-libzimg --enable-libzvbi --extra-cflags=-DLIBTWOLAME_STATIC --extra-cxxflags=
 --extra-libs=-lgomp --extra-ldflags=-pthread --extra-ldexeflags= --cc=x86_64-w64-mingw32-gcc --cxx=
x86_64-w64-mingw32-g++ --ar=x86_64-w64-mingw32-gcc-ar --ranlib=x86_64-w64-mingw32-gcc-ranlib --nm=x8
6_64-w64-mingw32-gcc-nm --extra-version=20241016
  libavutil      59. 44.100 / 59. 44.100
  libavcodec     61. 22.100 / 61. 22.100
  libavformat    61.  9.100 / 61.  9.100
  libavdevice    61.  4.100 / 61.  4.100
  libavfilter    10.  6.100 / 10.  6.100
  libswscale      8.  6.100 /  8.  6.100
  libswresample   5.  4.100 /  5.  4.100
  libpostproc    58.  4.100 / 58.  4.100
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'test-nv5.mp4':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2mp41
    encoder         : Lavf61.9.100
  Duration: 00:02:00.12, start: 0.000000, bitrate: 2266 kb/s
  Stream #0:0[0x1](und): Video: hevc (Main) (hev1 / 0x31766568), yuv420p(tv, bt709, top coded first
(swapped)), 1440x1080 [SAR 4:3 DAR 16:9], 2131 kb/s, 29.95 fps, 29.97 tbr, 30k tbn (default)
    Metadata:
      handler_name    : VideoHandler
      vendor_id       : [0][0][0][0]
      encoder         : Lavc61.22.100 hevc_nvenc
  Stream #0:1[0x2](und): Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 130 kb/s (defa
ult)
    Metadata:
      handler_name    : SoundHandler
      vendor_id       : [0][0][0][0]
Input #1, mpegts, from '../test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #1:0[0x1011]: Video: mpeg2video (Main) ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top firs
t), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 tbr, 90k tbn
    Side data:
      cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #1:1[0x1100]: Audio: aac (LC) ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 (hevc) -> libvmaf
  Stream #1:0 (mpeg2video) -> libvmaf
  libvmaf:default -> Stream #0:0 (wrapped_avframe)
  Stream #0:1 -> #0:1 (aac (native) -> pcm_s16le (native))
Press [q] to stop, [?] for help
Output #0, null, to 'pipe:':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2mp41
    encoder         : Lavf61.9.100
  Stream #0:0: Video: wrapped_avframe, yuv420p(tv, bt709, progressive), 1440x1080 [SAR 4:3 DAR 16:9]
, q=2-31, 200 kb/s, 29.97 fps, 29.97 tbn
    Metadata:
      encoder         : Lavc61.22.100 wrapped_avframe
  Stream #0:1(und): Audio: pcm_s16le, 48000 Hz, stereo, s16, 1536 kb/s (default)
    Metadata:
      encoder         : Lavc61.22.100 pcm_s16le
      handler_name    : SoundHandler
      vendor_id       : [0][0][0][0]
[Parsed_libvmaf_0 @ 000001507c6598c0] VMAF score: 59.207021
[out#0/null @ 000001507c659f00] video:1544KiB audio:22500KiB subtitle:0KiB other streams:0KiB global
 headers:0KiB muxing overhead: unknown
frame= 3593 fps= 15 q=-0.0 Lsize=N/A time=00:02:00.00 bitrate=N/A speed=0.507x
```
## Intel(R) Celeron(R) J4005 CPU @ 2.00GHz
### 7.02 hevc_qsv
```
$ ffmpeg -loglevel info  -y -i ../test.m2ts -c:v hevc_qsv  dtest-q5.mp4
ffmpeg version 7.0.2-3ubuntu1 Copyright (c) 2000-2024 the FFmpeg developers
  built with gcc 14 (Ubuntu 14.2.0-2ubuntu1)
  configuration: --prefix=/usr --extra-version=3ubuntu1 --toolchain=hardened --libdir=/usr/lib/x86_64-linux-gnu --incdir=/usr/include/x86_64-linux-gnu --ar
ch=amd64 --enable-gpl --disable-stripping --disable-libmfx --disable-omx --enable-gnutls --enable-libaom --enable-libass --enable-libbs2b --enable-libcdio
--enable-libcodec2 --enable-libdav1d --enable-libflite --enable-libfontconfig --enable-libfreetype --enable-libfribidi --enable-libglslang --enable-libgme
--enable-libgsm --enable-libharfbuzz --enable-libmp3lame --enable-libmysofa --enable-libopenjpeg --enable-libopenmpt --enable-libopus --enable-librubberban
d --enable-libshine --enable-libsnappy --enable-libsoxr --enable-libspeex --enable-libtheora --enable-libtwolame --enable-libvidstab --enable-libvorbis --e
nable-libvpx --enable-libwebp --enable-libx265 --enable-libxml2 --enable-libxvid --enable-libzimg --enable-openal --enable-opencl --enable-opengl --disable
-sndio --enable-libvpl --enable-libdc1394 --enable-libdrm --enable-libiec61883 --enable-chromaprint --enable-frei0r --enable-ladspa --enable-libbluray --en
able-libcaca --enable-libdvdnav --enable-libdvdread --enable-libjack --enable-libpulse --enable-librabbitmq --enable-librist --enable-libsrt --enable-libss
h --enable-libsvtav1 --enable-libx264 --enable-libzmq --enable-libzvbi --enable-lv2 --enable-sdl2 --enable-libplacebo --enable-librav1e --enable-pocketsphi
nx --enable-librsvg --enable-libjxl --enable-shared
  libavutil      59.  8.100 / 59.  8.100
  libavcodec     61.  3.100 / 61.  3.100
  libavformat    61.  1.100 / 61.  1.100
  libavdevice    61.  1.100 / 61.  1.100
  libavfilter    10.  1.100 / 10.  1.100
  libswscale      8.  1.100 /  8.  1.100
  libswresample   5.  1.100 /  5.  1.100
  libpostproc    58.  1.100 / 58.  1.100
Input #0, mpegts, from '../test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #0:0[0x1011]: Video: mpeg2video (Main) ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top first), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 tbr,
 90k tbn
      Side data:
        cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #0:1[0x1100]: Audio: aac (LC) ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 -> #0:0 (mpeg2video (native) -> hevc (hevc_qsv))
  Stream #0:1 -> #0:1 (aac (native) -> aac (native))
Press [q] to stop, [?] for help
[hevc_qsv @ 0x5f0780e01c00] Using the constant quantization parameter (CQP) by default. Please use the global_quality option and other options for a qualit
y-based mode or the b option and other options for a bitrate-based mode if the default is not the desired choice.
Output #0, mp4, to 'dtest-q5.mp4':
  Metadata:
    encoder         : Lavf61.1.100
  Stream #0:0: Video: hevc (hev1 / 0x31766568), nv12(tv, bt709, top coded first (swapped)), 1440x1080 [SAR 4:3 DAR 16:9], q=2-31, 29.97 fps, 30k tbn
      Metadata:
        encoder         : Lavc61.3.100 hevc_qsv
      Side data:
        cpb: bitrate max/min/avg: 0/0/0 buffer size: 0 vbv_delay: N/A
  Stream #0:1: Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 128 kb/s
      Metadata:
        encoder         : Lavc61.3.100 aac
[out#0/mp4 @ 0x5f078100cb00] video:12824KiB audio:1919KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: 0.909588%
frame= 3600 fps= 39 q=-0.0 Lsize=   14877KiB time=00:01:59.98 bitrate=1015.7kbits/s dup=7 drop=0 speed=1.31x
[aac @ 0x5f07811d0e80] Qavg: 1423.886
```
### 7.0.2 h264_qsv
```
$ ffmpeg -loglevel info  -y -i ../test.m2ts -c:v h264_qsv  dtest-q4.mp4
ffmpeg version 7.0.2-3ubuntu1 Copyright (c) 2000-2024 the FFmpeg developers
  built with gcc 14 (Ubuntu 14.2.0-2ubuntu1)
  configuration: --prefix=/usr --extra-version=3ubuntu1 --toolchain=hardened --libdir=/usr/lib/x86_64-linux-gnu --incdir=/usr/include/x86_64-linux-gnu --ar
ch=amd64 --enable-gpl --disable-stripping --disable-libmfx --disable-omx --enable-gnutls --enable-libaom --enable-libass --enable-libbs2b --enable-libcdio
--enable-libcodec2 --enable-libdav1d --enable-libflite --enable-libfontconfig --enable-libfreetype --enable-libfribidi --enable-libglslang --enable-libgme
--enable-libgsm --enable-libharfbuzz --enable-libmp3lame --enable-libmysofa --enable-libopenjpeg --enable-libopenmpt --enable-libopus --enable-librubberban
d --enable-libshine --enable-libsnappy --enable-libsoxr --enable-libspeex --enable-libtheora --enable-libtwolame --enable-libvidstab --enable-libvorbis --e
nable-libvpx --enable-libwebp --enable-libx265 --enable-libxml2 --enable-libxvid --enable-libzimg --enable-openal --enable-opencl --enable-opengl --disable
-sndio --enable-libvpl --enable-libdc1394 --enable-libdrm --enable-libiec61883 --enable-chromaprint --enable-frei0r --enable-ladspa --enable-libbluray --en
able-libcaca --enable-libdvdnav --enable-libdvdread --enable-libjack --enable-libpulse --enable-librabbitmq --enable-librist --enable-libsrt --enable-libss
h --enable-libsvtav1 --enable-libx264 --enable-libzmq --enable-libzvbi --enable-lv2 --enable-sdl2 --enable-libplacebo --enable-librav1e --enable-pocketsphi
nx --enable-librsvg --enable-libjxl --enable-shared
  libavutil      59.  8.100 / 59.  8.100
  libavcodec     61.  3.100 / 61.  3.100
  libavformat    61.  1.100 / 61.  1.100
  libavdevice    61.  1.100 / 61.  1.100
  libavfilter    10.  1.100 / 10.  1.100
  libswscale      8.  1.100 /  8.  1.100
  libswresample   5.  1.100 /  5.  1.100
  libpostproc    58.  1.100 / 58.  1.100
Input #0, mpegts, from '../test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #0:0[0x1011]: Video: mpeg2video (Main) ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top first), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 tbr,
 90k tbn
      Side data:
        cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #0:1[0x1100]: Audio: aac (LC) ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 -> #0:0 (mpeg2video (native) -> h264 (h264_qsv))
  Stream #0:1 -> #0:1 (aac (native) -> aac (native))
Press [q] to stop, [?] for help
[h264_qsv @ 0x57f897074c00] Using the constant quantization parameter (CQP) by default. Please use the global_quality option and other options for a qualit
y-based mode or the b option and other options for a bitrate-based mode if the default is not the desired choice.
Output #0, mp4, to 'dtest-q4.mp4':
  Metadata:
    encoder         : Lavf61.1.100
  Stream #0:0: Video: h264 (avc1 / 0x31637661), nv12(tv, bt709, top coded first (swapped)), 1440x1080 [SAR 4:3 DAR 16:9], q=2-31, 29.97 fps, 30k tbn
      Metadata:
        encoder         : Lavc61.3.100 h264_qsv
      Side data:
        cpb: bitrate max/min/avg: 0/0/0 buffer size: 0 vbv_delay: N/A
  Stream #0:1: Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 128 kb/s
      Metadata:
        encoder         : Lavc61.3.100 aac
[h264_qsv @ 0x57f897074c00] Warning during encoding: incompatible video parameters (5)
    Last message repeated 3593 times
[out#0/mp4 @ 0x57f89727fb00] video:19199KiB audio:1919KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: 0.590336%
frame= 3600 fps=145 q=33.0 Lsize=   21243KiB time=00:02:00.00 bitrate=1450.2kbits/s dup=7 drop=0 speed=4.82x
[aac @ 0x57f897443e80] Qavg: 1423.886
```
### 7.1 SVT-AV1 crf40
```
$ ~/ffmpeg-7.1a -loglevel info  -y -i ../test.m2ts -c:v libsvtav1 -crf 40  dtestav2.mp4
ffmpeg version 7.1 Copyright (c) 2000-2024 the FFmpeg developers
  built with gcc 14 (Ubuntu 14.2.0-4ubuntu2)
  configuration: --enable-small --disable-shared --disable-debug --disable-doc --enable-static --pkg-config-flags=--static --extra-libs=-static --extra-
cflags=--static --enable-nonfree --enable-version3 --enable-gpl --enable-libaribb24 --enable-libfdk-aac --enable-libx264 --enable-libx265 --enable-libsv
tav1 --enable-libdav1d --disable-encoder=aac
  libavutil      59. 39.100 / 59. 39.100
  libavcodec     61. 19.100 / 61. 19.100
  libavformat    61.  7.100 / 61.  7.100
  libavdevice    61.  3.100 / 61.  3.100
  libavfilter    10.  4.100 / 10.  4.100
  libswscale      8.  3.100 /  8.  3.100
  libswresample   5.  3.100 /  5.  3.100
  libpostproc    58.  3.100 / 58.  3.100
Input #0, mpegts, from '../test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #0:0[0x1011]: Video: mpeg2video ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top first), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 tbr, 90k
 tbn
      Side data:
        cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #0:1[0x1100]: Audio: aac ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 -> #0:0 (mpeg2video (native) -> av1 (libsvtav1))
  Stream #0:1 -> #0:1 (aac (native) -> aac (libfdk_aac))
Press [q] to stop, [?] for help
Svt[info]: -------------------------------------------
Svt[info]: SVT [version]:       SVT-AV1 Encoder Lib fdcb885
Svt[info]: SVT [build]  :       GCC 14.2.0       64 bit
Svt[info]: LIB Build date: Nov  8 2024 08:04:50
Svt[info]: -------------------------------------------
Svt[info]: Level of Parallelism: 2
Svt[info]: Number of PPCS 42
Svt[info]: [asm level on system : up to sse4_2]
Svt[info]: [asm level selected : up to sse4_2]
Svt[info]: -------------------------------------------
Svt[info]: SVT [config]: main profile   tier (auto)     level (auto)
Svt[info]: SVT [config]: width / height / fps numerator / fps denominator               : 1440 / 1080 / 30000 / 1001
Svt[info]: SVT [config]: bit-depth / color format                                       : 8 / YUV420
Svt[info]: SVT [config]: preset / tune / pred struct                                    : 10 / PSNR / random access
Svt[info]: SVT [config]: gop size / mini-gop size / key-frame type                      : 161 / 16 / key frame
Svt[info]: SVT [config]: BRC mode / rate factor                                         : CRF / 40
Svt[info]: SVT [config]: AQ mode / variance boost                                       : 2 / 0
Svt[info]: -------------------------------------------
Output #0, mp4, to 'dtestav2.mp4':
  Metadata:
    encoder         : Lavf61.7.100
  Stream #0:0: Video: av1 (av01 / 0x31307661), yuv420p(tv, bt709, top coded first (swapped)), 1440x1080 [SAR 4:3 DAR 16:9], q=2-31, 29.97 fps, 30k tbn
      Metadata:
        encoder         : Lavc61.19.100 libsvtav1
  Stream #0:1: Audio: aac (mp4a / 0x6134706D), 48000 Hz, stereo, s16, 139 kb/s
      Metadata:
        encoder         : Lavc61.19.100 libfdk_aac
[out#0/mp4 @ 0x81caa00] video:8082KiB audio:2047KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: 0.975261%
frame= 3593 fps= 19 q=38.0 Lsize=   10227KiB time=00:02:00.00 bitrate= 698.2kbits/s speed=0.62x
```
### 7.1 libx264
```
$ ~/ffmpeg-7.1a -loglevel info  -y -i ../test.m2ts -c:v libx264  dtest0.mp4
ffmpeg version 7.1 Copyright (c) 2000-2024 the FFmpeg developers
  built with gcc 14 (Ubuntu 14.2.0-4ubuntu2)
  configuration: --enable-small --disable-shared --disable-debug --disable-doc --enable-static --pkg-config-flags=--static --extra-libs=-static --extra-
cflags=--static --enable-nonfree --enable-version3 --enable-gpl --enable-libaribb24 --enable-libfdk-aac --enable-libx264 --enable-libx265 --enable-libsv
tav1 --enable-libdav1d --disable-encoder=aac
  libavutil      59. 39.100 / 59. 39.100
  libavcodec     61. 19.100 / 61. 19.100
  libavformat    61.  7.100 / 61.  7.100
  libavdevice    61.  3.100 / 61.  3.100
  libavfilter    10.  4.100 / 10.  4.100
  libswscale      8.  3.100 /  8.  3.100
  libswresample   5.  3.100 /  5.  3.100
  libpostproc    58.  3.100 / 58.  3.100
Input #0, mpegts, from '../test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #0:0[0x1011]: Video: mpeg2video ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top first), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 tbr, 90k
 tbn
      Side data:
        cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #0:1[0x1100]: Audio: aac ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 -> #0:0 (mpeg2video (native) -> h264 (libx264))
  Stream #0:1 -> #0:1 (aac (native) -> aac (libfdk_aac))
Press [q] to stop, [?] for help
[libx264 @ 0xbe91780] using SAR=4/3
[libx264 @ 0xbe91780] using cpu capabilities: MMX2 SSE2Fast SSSE3 SSE4.2
[libx264 @ 0xbe91780] profile High, level 4.0, 4:2:0, 8-bit
[libx264 @ 0xbe91780] 264 - core 164 r3108 31e19f9 - H.264/MPEG-4 AVC codec - Copyleft 2003-2023 - http://www.videolan.org/x264.html - options: cabac=1
ref=3 deblock=1:0:0 analyse=0x3:0x113 me=hex subme=7 psy=1 psy_rd=1.00:0.00 mixed_ref=1 me_range=16 chroma_me=1 trellis=1 8x8dct=1 cqm=0 deadzone=21,11
fast_pskip=1 chroma_qp_offset=-2 threads=3 lookahead_threads=1 sliced_threads=0 nr=0 decimate=1 interlaced=0 bluray_compat=0 constrained_intra=0 bframes
=3 b_pyramid=2 b_adapt=1 b_bias=0 direct=1 weightb=1 open_gop=0 weightp=2 keyint=250 keyint_min=25 scenecut=40 intra_refresh=0 rc_lookahead=40 rc=crf mb
tree=1 crf=23.0 qcomp=0.60 qpmin=0 qpmax=69 qpstep=4 ip_ratio=1.40 aq=1:1.00
Output #0, mp4, to 'dtest0.mp4':
  Metadata:
    encoder         : Lavf61.7.100
  Stream #0:0: Video: h264 (avc1 / 0x31637661), yuv420p(tv, bt709, top coded first (swapped)), 1440x1080 [SAR 4:3 DAR 16:9], q=2-31, 29.97 fps, 30k tbn
      Metadata:
        encoder         : Lavc61.19.100 libx264
      Side data:
        cpb: bitrate max/min/avg: 0/0/0 buffer size: 0 vbv_delay: N/A
  Stream #0:1: Audio: aac (mp4a / 0x6134706D), 48000 Hz, stereo, s16, 139 kb/s
      Metadata:
        encoder         : Lavc61.19.100 libfdk_aac
[out#0/mp4 @ 0xbea0980] video:29624KiB audio:2047KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: 0.402827%
frame= 3593 fps= 11 q=-1.0 Lsize=   31798KiB time=00:01:59.98 bitrate=2171.0kbits/s speed=0.377x
[libx264 @ 0xbe91780] frame I:54    Avg QP:18.37  size: 68000
[libx264 @ 0xbe91780] frame P:1073  Avg QP:21.10  size: 15617
[libx264 @ 0xbe91780] frame B:2466  Avg QP:22.69  size:  4017
[libx264 @ 0xbe91780] consecutive B-frames:  3.4%  6.4% 26.6% 63.6%
[libx264 @ 0xbe91780] mb I  I16..4: 21.9% 70.5%  7.7%
[libx264 @ 0xbe91780] mb P  I16..4:  4.9% 10.5%  1.1%  P16..4: 29.7%  4.7%  4.1%  0.0%  0.0%    skip:45.0%
[libx264 @ 0xbe91780] mb B  I16..4:  0.6%  0.8%  0.1%  B16..8: 22.5%  1.0%  0.1%  direct: 2.9%  skip:72.0%  L0:45.9% L1:52.6% BI: 1.5%
[libx264 @ 0xbe91780] 8x8 transform intra:63.6% inter:89.3%
[libx264 @ 0xbe91780] coded y,uvDC,uvAC intra: 33.9% 44.3% 12.6% inter: 5.5% 11.2% 0.6%
[libx264 @ 0xbe91780] i16 v,h,dc,p: 26% 46%  8% 20%
[libx264 @ 0xbe91780] i8 v,h,dc,ddl,ddr,vr,hd,vl,hu: 30% 17% 39%  3%  2%  3%  2%  3%  2%
[libx264 @ 0xbe91780] i4 v,h,dc,ddl,ddr,vr,hd,vl,hu: 15% 64%  9%  2%  2%  3%  2%  2%  1%
[libx264 @ 0xbe91780] i8c dc,h,v,p: 56% 22% 19%  3%
[libx264 @ 0xbe91780] Weighted P-Frames: Y:4.9% UV:4.0%
[libx264 @ 0xbe91780] ref P L0: 58.7%  5.9% 26.5%  8.6%  0.2%
[libx264 @ 0xbe91780] ref B L0: 75.8% 18.9%  5.3%
[libx264 @ 0xbe91780] ref B L1: 93.5%  6.5%
[libx264 @ 0xbe91780] kb/s:2021.96
```
### 7.02 SVT-AV1 crf 40
```
$ ffmpeg -loglevel info  -y -i ../test.m2ts -c:v libsvtav1 -crf 40 dtestav.mp4
ffmpeg version 7.0.2-3ubuntu1 Copyright (c) 2000-2024 the FFmpeg developers
  built with gcc 14 (Ubuntu 14.2.0-2ubuntu1)
  configuration: --prefix=/usr --extra-version=3ubuntu1 --toolchain=hardened --libdir=/usr/lib/x86_64-linux-gnu --incdir=/usr/include/x86_64-linux-gnu -
-arch=amd64 --enable-gpl --disable-stripping --disable-libmfx --disable-omx --enable-gnutls --enable-libaom --enable-libass --enable-libbs2b --enable-li
bcdio --enable-libcodec2 --enable-libdav1d --enable-libflite --enable-libfontconfig --enable-libfreetype --enable-libfribidi --enable-libglslang --enabl
e-libgme --enable-libgsm --enable-libharfbuzz --enable-libmp3lame --enable-libmysofa --enable-libopenjpeg --enable-libopenmpt --enable-libopus --enable-
librubberband --enable-libshine --enable-libsnappy --enable-libsoxr --enable-libspeex --enable-libtheora --enable-libtwolame --enable-libvidstab --enabl
e-libvorbis --enable-libvpx --enable-libwebp --enable-libx265 --enable-libxml2 --enable-libxvid --enable-libzimg --enable-openal --enable-opencl --enabl
e-opengl --disable-sndio --enable-libvpl --enable-libdc1394 --enable-libdrm --enable-libiec61883 --enable-chromaprint --enable-frei0r --enable-ladspa --
enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-libjack --enable-libpulse --enable-librabbitmq --enable-librist --enab
le-libsrt --enable-libssh --enable-libsvtav1 --enable-libx264 --enable-libzmq --enable-libzvbi --enable-lv2 --enable-sdl2 --enable-libplacebo --enable-l
ibrav1e --enable-pocketsphinx --enable-librsvg --enable-libjxl --enable-shared
  libavutil      59.  8.100 / 59.  8.100
  libavcodec     61.  3.100 / 61.  3.100
  libavformat    61.  1.100 / 61.  1.100
  libavdevice    61.  1.100 / 61.  1.100
  libavfilter    10.  1.100 / 10.  1.100
  libswscale      8.  1.100 /  8.  1.100
  libswresample   5.  1.100 /  5.  1.100
  libpostproc    58.  1.100 / 58.  1.100
Input #0, mpegts, from '../test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #0:0[0x1011]: Video: mpeg2video (Main) ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top first), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 t
br, 90k tbn
      Side data:
        cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #0:1[0x1100]: Audio: aac (LC) ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 -> #0:0 (mpeg2video (native) -> av1 (libsvtav1))
  Stream #0:1 -> #0:1 (aac (native) -> aac (native))
Press [q] to stop, [?] for help
Svt[info]: -------------------------------------------
Svt[info]: SVT [version]:       SVT-AV1 Encoder Lib v2.1.0
Svt[info]: SVT [build]  :       GCC 13.3.0       64 bit
Svt[info]: -------------------------------------------
Svt[info]: Number of logical cores available: 2
Svt[info]: Number of PPCS 42
Svt[info]: [asm level on system : up to sse4_2]
Svt[info]: [asm level selected : up to sse4_2]
Svt[info]: -------------------------------------------
Svt[info]: SVT [config]: main profile   tier (auto)     level (auto)
Svt[info]: SVT [config]: width / height / fps numerator / fps denominator               : 1440 / 1080 / 30000 / 1001
Svt[info]: SVT [config]: bit-depth / color format                                       : 8 / YUV420
Svt[info]: SVT [config]: preset / tune / pred struct                                    : 10 / PSNR / random access
Svt[info]: SVT [config]: gop size / mini-gop size / key-frame type                      : 161 / 16 / key frame
Svt[info]: SVT [config]: BRC mode / rate factor                                         : CRF / 40
Svt[info]: SVT [config]: AQ mode / variance boost                                       : 2 / 0
Svt[info]: -------------------------------------------
Output #0, mp4, to 'dtestav.mp4':
  Metadata:
    encoder         : Lavf61.1.100
  Stream #0:0: Video: av1 (av01 / 0x31307661), yuv420p(tv, bt709, top coded first (swapped)), 1440x1080 [SAR 4:3 DAR 16:9], q=2-31, 29.97 fps, 30k tbn
      Metadata:
        encoder         : Lavc61.3.100 libsvtav1
  Stream #0:1: Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 128 kb/s
      Metadata:
        encoder         : Lavc61.3.100 aac
[out#0/mp4 @ 0x5fc59a03fa40] video:8214KiB audio:1919KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: 0.975573%
frame= 3600 fps= 14 q=40.0 Lsize=   10232KiB time=00:02:00.00 bitrate= 698.5kbits/s dup=7 drop=0 speed=0.451x
[aac @ 0x5fc59a127b80] Qavg: 1423.886
```
### 7.0.2 livx264
```
$ ffmpeg -loglevel info  -y -i ../test.m2ts -c:v libx264  dtest0.mp4
ffmpeg version 7.0.2-3ubuntu1 Copyright (c) 2000-2024 the FFmpeg developers
  built with gcc 14 (Ubuntu 14.2.0-2ubuntu1)
  configuration: --prefix=/usr --extra-version=3ubuntu1 --toolchain=hardened --libdir=/usr/lib/x86_64-linux-gnu --incdir=/usr/include/x86_64-linux-gnu -
-arch=amd64 --enable-gpl --disable-stripping --disable-libmfx --disable-omx --enable-gnutls --enable-libaom --enable-libass --enable-libbs2b --enable-li
bcdio --enable-libcodec2 --enable-libdav1d --enable-libflite --enable-libfontconfig --enable-libfreetype --enable-libfribidi --enable-libglslang --enabl
e-libgme --enable-libgsm --enable-libharfbuzz --enable-libmp3lame --enable-libmysofa --enable-libopenjpeg --enable-libopenmpt --enable-libopus --enable-
librubberband --enable-libshine --enable-libsnappy --enable-libsoxr --enable-libspeex --enable-libtheora --enable-libtwolame --enable-libvidstab --enabl
e-libvorbis --enable-libvpx --enable-libwebp --enable-libx265 --enable-libxml2 --enable-libxvid --enable-libzimg --enable-openal --enable-opencl --enabl
e-opengl --disable-sndio --enable-libvpl --enable-libdc1394 --enable-libdrm --enable-libiec61883 --enable-chromaprint --enable-frei0r --enable-ladspa --
enable-libbluray --enable-libcaca --enable-libdvdnav --enable-libdvdread --enable-libjack --enable-libpulse --enable-librabbitmq --enable-librist --enab
le-libsrt --enable-libssh --enable-libsvtav1 --enable-libx264 --enable-libzmq --enable-libzvbi --enable-lv2 --enable-sdl2 --enable-libplacebo --enable-l
ibrav1e --enable-pocketsphinx --enable-librsvg --enable-libjxl --enable-shared
  libavutil      59.  8.100 / 59.  8.100
  libavcodec     61.  3.100 / 61.  3.100
  libavformat    61.  1.100 / 61.  1.100
  libavdevice    61.  1.100 / 61.  1.100
  libavfilter    10.  1.100 / 10.  1.100
  libswscale      8.  1.100 /  8.  1.100
  libswresample   5.  1.100 /  5.  1.100
  libpostproc    58.  1.100 / 58.  1.100
Input #0, mpegts, from '../test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #0:0[0x1011]: Video: mpeg2video (Main) ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top first), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 t
br, 90k tbn
      Side data:
        cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #0:1[0x1100]: Audio: aac (LC) ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 -> #0:0 (mpeg2video (native) -> h264 (libx264))
  Stream #0:1 -> #0:1 (aac (native) -> aac (native))
Press [q] to stop, [?] for help
[libx264 @ 0x648b3f383c00] using SAR=4/3
[libx264 @ 0x648b3f383c00] using cpu capabilities: MMX2 SSE2Fast SSSE3 SSE4.2
[libx264 @ 0x648b3f383c00] profile High, level 4.0, 4:2:0, 8-bit
[libx264 @ 0x648b3f383c00] 264 - core 164 r3108 31e19f9 - H.264/MPEG-4 AVC codec - Copyleft 2003-2023 - http://www.videolan.org/x264.html - options: cab
ac=1 ref=3 deblock=1:0:0 analyse=0x3:0x113 me=hex subme=7 psy=1 psy_rd=1.00:0.00 mixed_ref=1 me_range=16 chroma_me=1 trellis=1 8x8dct=1 cqm=0 deadzone=2
1,11 fast_pskip=1 chroma_qp_offset=-2 threads=3 lookahead_threads=1 sliced_threads=0 nr=0 decimate=1 interlaced=0 bluray_compat=0 constrained_intra=0 bf
rames=3 b_pyramid=2 b_adapt=1 b_bias=0 direct=1 weightb=1 open_gop=0 weightp=2 keyint=250 keyint_min=25 scenecut=40 intra_refresh=0 rc_lookahead=40 rc=c
rf mbtree=1 crf=23.0 qcomp=0.60 qpmin=0 qpmax=69 qpstep=4 ip_ratio=1.40 aq=1:1.00
Output #0, mp4, to 'dtest0.mp4':
  Metadata:
    encoder         : Lavf61.1.100
  Stream #0:0: Video: h264 (avc1 / 0x31637661), yuv420p(tv, bt709, top coded first (swapped)), 1440x1080 [SAR 4:3 DAR 16:9], q=2-31, 29.97 fps, 30k tbn
      Metadata:
        encoder         : Lavc61.3.100 libx264
      Side data:
        cpb: bitrate max/min/avg: 0/0/0 buffer size: 0 vbv_delay: N/A
  Stream #0:1: Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 128 kb/s
      Metadata:
        encoder         : Lavc61.3.100 aac
[out#0/mp4 @ 0x648b3f58eb00] video:29634KiB audio:1919KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: 0.404824%
frame= 3600 fps= 13 q=-1.0 Lsize=   31681KiB time=00:02:00.00 bitrate=2162.7kbits/s dup=7 drop=0 speed=0.434x
[libx264 @ 0x648b3f383c00] frame I:55    Avg QP:18.35  size: 67725
[libx264 @ 0x648b3f383c00] frame P:1074  Avg QP:21.10  size: 15560
[libx264 @ 0x648b3f383c00] frame B:2471  Avg QP:22.69  size:  4010
[libx264 @ 0x648b3f383c00] consecutive B-frames:  3.4%  6.4% 26.4% 63.8%
[libx264 @ 0x648b3f383c00] mb I  I16..4: 21.6% 70.8%  7.6%
[libx264 @ 0x648b3f383c00] mb P  I16..4:  4.9% 10.4%  1.1%  P16..4: 29.7%  4.7%  4.1%  0.0%  0.0%    skip:45.1%
[libx264 @ 0x648b3f383c00] mb B  I16..4:  0.6%  0.8%  0.1%  B16..8: 22.5%  1.0%  0.1%  direct: 2.9%  skip:72.1%  L0:46.0% L1:52.5% BI: 1.5%
[libx264 @ 0x648b3f383c00] 8x8 transform intra:63.6% inter:89.4%
[libx264 @ 0x648b3f383c00] coded y,uvDC,uvAC intra: 34.0% 44.3% 12.7% inter: 5.4% 11.2% 0.6%
[libx264 @ 0x648b3f383c00] i16 v,h,dc,p: 26% 46%  8% 20%
[libx264 @ 0x648b3f383c00] i8 v,h,dc,ddl,ddr,vr,hd,vl,hu: 30% 17% 39%  3%  2%  3%  2%  3%  2%
[libx264 @ 0x648b3f383c00] i4 v,h,dc,ddl,ddr,vr,hd,vl,hu: 15% 64%  9%  2%  2%  3%  2%  2%  1%
[libx264 @ 0x648b3f383c00] i8c dc,h,v,p: 56% 22% 19%  3%
[libx264 @ 0x648b3f383c00] Weighted P-Frames: Y:4.8% UV:3.9%
[libx264 @ 0x648b3f383c00] ref P L0: 58.7%  5.9% 26.5%  8.7%  0.2%
[libx264 @ 0x648b3f383c00] ref B L0: 75.8% 18.9%  5.3%
[libx264 @ 0x648b3f383c00] ref B L1: 93.5%  6.5%
[libx264 @ 0x648b3f383c00] kb/s:2020.94
[aac @ 0x648b3f676d00] Qavg: 1423.886
```
### vmaf hevc_qsv  
```
$ ffmpeg-7.1.exe -loglevel info  -i dtest-q5.mp4 -i ../test.m2ts -lavfi lib
vmaf='model=version=vmaf_v0.6.1' -f null -
ffmpeg version N-117568-g31b5b3badc-20241016 Copyright (c) 2000-2024 the FFmpeg developers
  built with gcc 14.2.0 (crosstool-NG 1.26.0.120_4d36f27)
  configuration: --prefix=/ffbuild/prefix --pkg-config-flags=--static --pkg-config=pkg-config --cros
s-prefix=x86_64-w64-mingw32- --arch=x86_64 --target-os=mingw32 --enable-gpl --enable-version3 --disa
ble-debug --disable-w32threads --enable-pthreads --enable-iconv --enable-zlib --enable-libfreetype -
-enable-libfribidi --enable-gmp --enable-libxml2 --enable-lzma --enable-fontconfig --enable-libharfb
uzz --enable-libvorbis --enable-opencl --disable-libpulse --enable-libvmaf --disable-libxcb --disabl
e-xlib --enable-amf --enable-libaom --enable-libaribb24 --enable-avisynth --enable-chromaprint --ena
ble-libdav1d --enable-libdavs2 --enable-libdvdread --enable-libdvdnav --disable-libfdk-aac --enable-
ffnvcodec --enable-cuda-llvm --enable-frei0r --enable-libgme --enable-libkvazaar --enable-libaribcap
tion --enable-libass --enable-libbluray --enable-libjxl --enable-libmp3lame --enable-libopus --enabl
e-librist --enable-libssh --enable-libtheora --enable-libvpx --enable-libwebp --enable-libzmq --enab
le-lv2 --enable-libvpl --enable-openal --enable-libopencore-amrnb --enable-libopencore-amrwb --enabl
e-libopenh264 --enable-libopenjpeg --enable-libopenmpt --enable-librav1e --enable-librubberband --en
able-schannel --enable-sdl2 --enable-libsoxr --enable-libsrt --enable-libsvtav1 --enable-libtwolame
--enable-libuavs3d --disable-libdrm --enable-vaapi --enable-libvidstab --enable-vulkan --enable-libs
haderc --enable-libplacebo --enable-libvvenc --enable-libx264 --enable-libx265 --enable-libxavs2 --e
nable-libxvid --enable-libzimg --enable-libzvbi --extra-cflags=-DLIBTWOLAME_STATIC --extra-cxxflags=
 --extra-libs=-lgomp --extra-ldflags=-pthread --extra-ldexeflags= --cc=x86_64-w64-mingw32-gcc --cxx=
x86_64-w64-mingw32-g++ --ar=x86_64-w64-mingw32-gcc-ar --ranlib=x86_64-w64-mingw32-gcc-ranlib --nm=x8
6_64-w64-mingw32-gcc-nm --extra-version=20241016
  libavutil      59. 44.100 / 59. 44.100
  libavcodec     61. 22.100 / 61. 22.100
  libavformat    61.  9.100 / 61.  9.100
  libavdevice    61.  4.100 / 61.  4.100
  libavfilter    10.  6.100 / 10.  6.100
  libswscale      8.  6.100 /  8.  6.100
  libswresample   5.  4.100 /  5.  4.100
  libpostproc    58.  4.100 / 58.  4.100
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'dtest-q5.mp4':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2mp41
    encoder         : Lavf61.1.100
  Duration: 00:02:00.12, start: 0.000000, bitrate: 1014 kb/s
  Stream #0:0[0x1](und): Video: hevc (Main) (hev1 / 0x31766568), yuv420p(tv, bt709, top coded first
(swapped)), 1440x1080 [SAR 4:3 DAR 16:9], 874 kb/s, 29.97 fps, 29.97 tbr, 30k tbn (default)
    Metadata:
      handler_name    : VideoHandler
      vendor_id       : [0][0][0][0]
      encoder         : Lavc61.3.100 hevc_qsv
  Stream #0:1[0x2](und): Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 130 kb/s (defa
ult)
    Metadata:
      handler_name    : SoundHandler
      vendor_id       : [0][0][0][0]
Input #1, mpegts, from '../test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #1:0[0x1011]: Video: mpeg2video (Main) ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top firs
t), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 tbr, 90k tbn
    Side data:
      cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #1:1[0x1100]: Audio: aac (LC) ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 (hevc) -> libvmaf
  Stream #1:0 (mpeg2video) -> libvmaf
  libvmaf:default -> Stream #0:0 (wrapped_avframe)
  Stream #0:1 -> #0:1 (aac (native) -> pcm_s16le (native))
Press [q] to stop, [?] for help
Output #0, null, to 'pipe:':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2mp41
    encoder         : Lavf61.9.100
  Stream #0:0: Video: wrapped_avframe, yuv420p(tv, bt709, progressive), 1440x1080 [SAR 4:3 DAR 16:9]
, q=2-31, 200 kb/s, 29.97 fps, 29.97 tbn
    Metadata:
      encoder         : Lavc61.22.100 wrapped_avframe
  Stream #0:1(und): Audio: pcm_s16le, 48000 Hz, stereo, s16, 1536 kb/s (default)
    Metadata:
      encoder         : Lavc61.22.100 pcm_s16le
      handler_name    : SoundHandler
      vendor_id       : [0][0][0][0]
[Parsed_libvmaf_0 @ 00000278eee3a380] VMAF score: 56.074634
[out#0/null @ 00000278ece0eb00] video:1547KiB audio:22500KiB subtitle:0KiB other streams:0KiB global
 headers:0KiB muxing overhead: unknown
frame= 3600 fps= 15 q=-0.0 Lsize=N/A time=00:02:00.00 bitrate=N/A speed=0.514x
```
### vmaf h264_qsv
```
$ ffmpeg-7.1.exe -loglevel info  -i dtest-q4.mp4 -i ../test.m2ts -lavfi lib
vmaf='model=version=vmaf_v0.6.1' -f null -
ffmpeg version N-117568-g31b5b3badc-20241016 Copyright (c) 2000-2024 the FFmpeg developers
  built with gcc 14.2.0 (crosstool-NG 1.26.0.120_4d36f27)
  configuration: --prefix=/ffbuild/prefix --pkg-config-flags=--static --pkg-config=pkg-config --cros
s-prefix=x86_64-w64-mingw32- --arch=x86_64 --target-os=mingw32 --enable-gpl --enable-version3 --disa
ble-debug --disable-w32threads --enable-pthreads --enable-iconv --enable-zlib --enable-libfreetype -
-enable-libfribidi --enable-gmp --enable-libxml2 --enable-lzma --enable-fontconfig --enable-libharfb
uzz --enable-libvorbis --enable-opencl --disable-libpulse --enable-libvmaf --disable-libxcb --disabl
e-xlib --enable-amf --enable-libaom --enable-libaribb24 --enable-avisynth --enable-chromaprint --ena
ble-libdav1d --enable-libdavs2 --enable-libdvdread --enable-libdvdnav --disable-libfdk-aac --enable-
ffnvcodec --enable-cuda-llvm --enable-frei0r --enable-libgme --enable-libkvazaar --enable-libaribcap
tion --enable-libass --enable-libbluray --enable-libjxl --enable-libmp3lame --enable-libopus --enabl
e-librist --enable-libssh --enable-libtheora --enable-libvpx --enable-libwebp --enable-libzmq --enab
le-lv2 --enable-libvpl --enable-openal --enable-libopencore-amrnb --enable-libopencore-amrwb --enabl
e-libopenh264 --enable-libopenjpeg --enable-libopenmpt --enable-librav1e --enable-librubberband --en
able-schannel --enable-sdl2 --enable-libsoxr --enable-libsrt --enable-libsvtav1 --enable-libtwolame
--enable-libuavs3d --disable-libdrm --enable-vaapi --enable-libvidstab --enable-vulkan --enable-libs
haderc --enable-libplacebo --enable-libvvenc --enable-libx264 --enable-libx265 --enable-libxavs2 --e
nable-libxvid --enable-libzimg --enable-libzvbi --extra-cflags=-DLIBTWOLAME_STATIC --extra-cxxflags=
 --extra-libs=-lgomp --extra-ldflags=-pthread --extra-ldexeflags= --cc=x86_64-w64-mingw32-gcc --cxx=
x86_64-w64-mingw32-g++ --ar=x86_64-w64-mingw32-gcc-ar --ranlib=x86_64-w64-mingw32-gcc-ranlib --nm=x8
6_64-w64-mingw32-gcc-nm --extra-version=20241016
  libavutil      59. 44.100 / 59. 44.100
  libavcodec     61. 22.100 / 61. 22.100
  libavformat    61.  9.100 / 61.  9.100
  libavdevice    61.  4.100 / 61.  4.100
  libavfilter    10.  6.100 / 10.  6.100
  libswscale      8.  6.100 /  8.  6.100
  libswresample   5.  4.100 /  5.  4.100
  libpostproc    58.  4.100 / 58.  4.100
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'dtest-q4.mp4':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2avc1mp41
    encoder         : Lavf61.1.100
  Duration: 00:02:00.12, start: 0.000000, bitrate: 1448 kb/s
  Stream #0:0[0x1](und): Video: h264 (High) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 14
40x1080 [SAR 4:3 DAR 16:9], 1309 kb/s, 29.97 fps, 29.97 tbr, 30k tbn (default)
    Metadata:
      handler_name    : VideoHandler
      vendor_id       : [0][0][0][0]
      encoder         : Lavc61.3.100 h264_qsv
  Stream #0:1[0x2](und): Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 130 kb/s (defa
ult)
    Metadata:
      handler_name    : SoundHandler
      vendor_id       : [0][0][0][0]
Input #1, mpegts, from '../test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #1:0[0x1011]: Video: mpeg2video (Main) ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top firs
t), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 tbr, 90k tbn
    Side data:
      cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #1:1[0x1100]: Audio: aac (LC) ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 (h264) -> libvmaf
  Stream #1:0 (mpeg2video) -> libvmaf
  libvmaf:default -> Stream #0:0 (wrapped_avframe)
  Stream #0:1 -> #0:1 (aac (native) -> pcm_s16le (native))
Press [q] to stop, [?] for help
Output #0, null, to 'pipe:':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2avc1mp41
    encoder         : Lavf61.9.100
  Stream #0:0: Video: wrapped_avframe, yuv420p(tv, bt709, progressive), 1440x1080 [SAR 4:3 DAR 16:9]
, q=2-31, 200 kb/s, 29.97 fps, 29.97 tbn
    Metadata:
      encoder         : Lavc61.22.100 wrapped_avframe
  Stream #0:1(und): Audio: pcm_s16le, 48000 Hz, stereo, s16, 1536 kb/s (default)
    Metadata:
      encoder         : Lavc61.22.100 pcm_s16le
      handler_name    : SoundHandler
      vendor_id       : [0][0][0][0]
[Parsed_libvmaf_0 @ 000002807d1b6400] VMAF score: 56.243194
[out#0/null @ 000002807b03e4c0] video:1547KiB audio:22500KiB subtitle:0KiB other streams:0KiB global
 headers:0KiB muxing overhead: unknown
frame= 3600 fps= 15 q=-0.0 Lsize=N/A time=00:02:00.00 bitrate=N/A speed=0.51x
```
## Snapdragon® 695 5G Mobile Platform 2.2GHz + 1.8GHz オクタコア(xperia10m4)
### 6.1.2 SVT-AV1
```
$ffmpeg -loglevel info  -y -i test.m2ts -c:v libsvtav1 -crf 40 testx.mp4
ffmpeg version 6.1.2 Copyright (c) 2000-2024 the FFmpeg developers
  built with Android (12470979, +pgo, +bolt, +lto, +mlgo, based on r522817c) clang version 18.0.3 (https://android.googlesource.com/toolchain/llvm-proje
ct d8003a456d14a3deb8054cdaa529ffbf02d9b262)
  configuration: --arch=aarch64 --as=aarch64-linux-android-clang --cc=aarch64-linux-android-clang --cxx=aarch64-linux-android-clang++ --nm=llvm-nm --ar=
llvm-ar --ranlib=llvm-ranlib --pkg-config=/home/builder/.termux-build/_cache/android-r27c-api-24-v1/bin/pkg-config --strip=llvm-strip --cross-prefix=aar
ch64-linux-android- --disable-indevs --disable-outdevs --enable-indev=lavfi --disable-static --disable-symver --enable-cross-compile --enable-gnutls --e
nable-gpl --enable-version3 --enable-jni --enable-lcms2 --enable-libaom --enable-libass --enable-libbluray --enable-libdav1d --enable-libfontconfig --en
able-libfreetype --enable-libfribidi --enable-libgme --enable-libharfbuzz --enable-libmp3lame --enable-libopencore-amrnb --enable-libopencore-amrwb --en
able-libopenmpt --enable-libopus --enable-librav1e --enable-libsoxr --enable-libsrt --enable-libssh --enable-libsvtav1 --enable-libtheora --enable-libv4
l2 --enable-libvidstab --enable-libvmaf --enable-libvo-amrwbenc --enable-libvorbis --enable-libvpx --enable-libwebp --enable-libx264 --enable-libx265 --
enable-libxml2 --enable-libxvid --enable-libzimg --enable-mediacodec --enable-opencl --enable-shared --prefix=/data/data/com.termux/files/usr --target-o
s=android --extra-libs=-landroid-glob --disable-vulkan --enable-neon --disable-libfdk-aac
  libavutil      58. 29.100 / 58. 29.100
  libavcodec     60. 31.102 / 60. 31.102
  libavformat    60. 16.100 / 60. 16.100
  libavdevice    60.  3.100 / 60.  3.100
  libavfilter     9. 12.100 /  9. 12.100
  libswscale      7.  5.100 /  7.  5.100
  libswresample   4. 12.100 /  4. 12.100
  libpostproc    57.  3.100 / 57.  3.100
Input #0, mpegts, from 'test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #0:0[0x1011]: Video: mpeg2video (Main) ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top first), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 t
br, 90k tbn
    Side data:
      cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #0:1[0x1100]: Audio: aac (LC) ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 -> #0:0 (mpeg2video (native) -> av1 (libsvtav1))
  Stream #0:1 -> #0:1 (aac (native) -> aac (native))
Press [q] to stop, [?] for help
Svt[info]: -------------------------------------------
Svt[info]: SVT [version]:       SVT-AV1 Encoder Lib v2.3.0
Svt[info]: SVT [build]  :       Android (12285214, +pgo, +bolt, +lto, +mlgo, based on r522817b) Clang 18.0.2 (https://android.googlesource.com/toolchain
/llvm-project d8003a456d14a3deb8054cdaa529ffbf02d9b262)  64 bit
Svt[info]: LIB Build date: Oct 30 2024 00:31:44
Svt[info]: -------------------------------------------
Svt[info]: Level of Parallelism: 4
Svt[info]: Number of PPCS 59
Svt[info]: [asm level on system : up to neon_dotprod]
Svt[info]: [asm level selected : up to neon_dotprod]
Svt[info]: -------------------------------------------
Svt[info]: SVT [config]: main profile   tier (auto)     level (auto)
Svt[info]: SVT [config]: width / height / fps numerator / fps denominator               : 1440 / 1080 / 30000 / 1001
Svt[info]: SVT [config]: bit-depth / color format                                       : 8 / YUV420
Svt[info]: SVT [config]: preset / tune / pred struct                                    : 10 / PSNR / random access
Svt[info]: SVT [config]: gop size / mini-gop size / key-frame type                      : 161 / 16 / key frame
Svt[info]: SVT [config]: BRC mode / rate factor                                         : CRF / 40
Svt[info]: SVT [config]: AQ mode / variance boost                                       : 2 / 0
Svt[info]: -------------------------------------------
Output #0, mp4, to 'testx.mp4':
  Metadata:
    encoder         : Lavf60.16.100
  Stream #0:0: Video: av1 (av01 / 0x31307661), yuv420p(tv, bt709, top coded first (swapped)), 1440x1080 [SAR 4:3 DAR 16:9], q=2-31, 29.97 fps, 30k tbn
    Metadata:
      encoder         : Lavc60.31.102 libsvtav1
  Stream #0:1: Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 128 kb/s
    Metadata:
      encoder         : Lavc60.31.102 aac
[out#0/mp4 @ 0xb4000072404260b0] video:8238kB audio:1920kB subtitle:0kB other streams:0kB global headers:0kB muxing overhead: 0.973102%
frame= 3600 fps= 38 q=40.0 Lsize=   10258kB time=00:02:00.08 bitrate= 699.7kbits/s dup=7 drop=0 speed=1.26x
[aac @ 0xb4000073d0426c70] Qavg: 1420.264
```
### 6.1.2 libx264
```
$ffmpeg -loglevel info  -y -i test.m2ts -c:v libx264 test4.mp4
ffmpeg version 6.1.2 Copyright (c) 2000-2024 the FFmpeg developers
  built with Android (12470979, +pgo, +bolt, +lto, +mlgo, based on r522817c) clang version 18.0.3 (https://android.googlesource.com/toolchain/llvm-proje
ct d8003a456d14a3deb8054cdaa529ffbf02d9b262)
  configuration: --arch=aarch64 --as=aarch64-linux-android-clang --cc=aarch64-linux-android-clang --cxx=aarch64-linux-android-clang++ --nm=llvm-nm --ar=
llvm-ar --ranlib=llvm-ranlib --pkg-config=/home/builder/.termux-build/_cache/android-r27c-api-24-v1/bin/pkg-config --strip=llvm-strip --cross-prefix=aar
ch64-linux-android- --disable-indevs --disable-outdevs --enable-indev=lavfi --disable-static --disable-symver --enable-cross-compile --enable-gnutls --e
nable-gpl --enable-version3 --enable-jni --enable-lcms2 --enable-libaom --enable-libass --enable-libbluray --enable-libdav1d --enable-libfontconfig --en
able-libfreetype --enable-libfribidi --enable-libgme --enable-libharfbuzz --enable-libmp3lame --enable-libopencore-amrnb --enable-libopencore-amrwb --en
able-libopenmpt --enable-libopus --enable-librav1e --enable-libsoxr --enable-libsrt --enable-libssh --enable-libsvtav1 --enable-libtheora --enable-libv4
l2 --enable-libvidstab --enable-libvmaf --enable-libvo-amrwbenc --enable-libvorbis --enable-libvpx --enable-libwebp --enable-libx264 --enable-libx265 --
enable-libxml2 --enable-libxvid --enable-libzimg --enable-mediacodec --enable-opencl --enable-shared --prefix=/data/data/com.termux/files/usr --target-o
s=android --extra-libs=-landroid-glob --disable-vulkan --enable-neon --disable-libfdk-aac
  libavutil      58. 29.100 / 58. 29.100
  libavcodec     60. 31.102 / 60. 31.102
  libavformat    60. 16.100 / 60. 16.100
  libavdevice    60.  3.100 / 60.  3.100
  libavfilter     9. 12.100 /  9. 12.100
  libswscale      7.  5.100 /  7.  5.100
  libswresample   4. 12.100 /  4. 12.100
  libpostproc    57.  3.100 / 57.  3.100
Input #0, mpegts, from 'test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #0:0[0x1011]: Video: mpeg2video (Main) ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top first), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 t
br, 90k tbn
    Side data:
      cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #0:1[0x1100]: Audio: aac (LC) ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 -> #0:0 (mpeg2video (native) -> h264 (libx264))
  Stream #0:1 -> #0:1 (aac (native) -> aac (native))
Press [q] to stop, [?] for help
[libx264 @ 0xb4000077c74403d0] using SAR=4/3
[libx264 @ 0xb4000077c74403d0] using cpu capabilities: ARMv8 NEON
[libx264 @ 0xb4000077c74403d0] profile High, level 4.0, 4:2:0, 8-bit
[libx264 @ 0xb4000077c74403d0] 264 - core 164 - H.264/MPEG-4 AVC codec - Copyleft 2003-2024 - http://www.videolan.org/x264.html - options: cabac=1 ref=3
 deblock=1:0:0 analyse=0x3:0x113 me=hex subme=7 psy=1 psy_rd=1.00:0.00 mixed_ref=1 me_range=16 chroma_me=1 trellis=1 8x8dct=1 cqm=0 deadzone=21,11 fast_
pskip=1 chroma_qp_offset=-2 threads=12 lookahead_threads=2 sliced_threads=0 nr=0 decimate=1 interlaced=0 bluray_compat=0 constrained_intra=0 bframes=3 b
_pyramid=2 b_adapt=1 b_bias=0 direct=1 weightb=1 open_gop=0 weightp=2 keyint=250 keyint_min=25 scenecut=40 intra_refresh=0 rc_lookahead=40 rc=crf mbtree
=1 crf=23.0 qcomp=0.60 qpmin=0 qpmax=69 qpstep=4 ip_ratio=1.40 aq=1:1.00
Output #0, mp4, to 'test4.mp4':
  Metadata:
    encoder         : Lavf60.16.100
  Stream #0:0: Video: h264 (avc1 / 0x31637661), yuv420p(tv, bt709, top coded first (swapped)), 1440x1080 [SAR 4:3 DAR 16:9], q=2-31, 29.97 fps, 30k tbn
    Metadata:
      encoder         : Lavc60.31.102 libx264
    Side data:
      cpb: bitrate max/min/avg: 0/0/0 buffer size: 0 vbv_delay: N/A
  Stream #0:1: Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 128 kb/s
    Metadata:
      encoder         : Lavc60.31.102 aac
[out#0/mp4 @ 0xb4000077b744ae10] video:29766kB audio:1920kB subtitle:0kB other streams:0kB global headers:0kB muxing overhead: 0.403265%
frame= 3600 fps= 26 q=-1.0 Lsize=   31814kB time=00:02:00.01 bitrate=2171.5kbits/s dup=7 drop=0 speed=0.863x
[libx264 @ 0xb4000077c74403d0] frame I:55    Avg QP:18.34  size: 67692
[libx264 @ 0xb4000077c74403d0] frame P:1069  Avg QP:21.09  size: 15653
[libx264 @ 0xb4000077c74403d0] frame B:2476  Avg QP:22.68  size:  4048
[libx264 @ 0xb4000077c74403d0] consecutive B-frames:  3.4%  5.9% 25.8% 64.8%
[libx264 @ 0xb4000077c74403d0] mb I  I16..4: 22.5% 69.9%  7.6%
[libx264 @ 0xb4000077c74403d0] mb P  I16..4:  5.1% 10.4%  1.2%  P16..4: 29.6%  4.6%  4.1%  0.0%  0.0%    skip:45.0%
[libx264 @ 0xb4000077c74403d0] mb B  I16..4:  0.6%  0.8%  0.1%  B16..8: 22.5%  1.0%  0.1%  direct: 2.9%  skip:72.0%  L0:45.8% L1:52.7% BI: 1.5%
[libx264 @ 0xb4000077c74403d0] 8x8 transform intra:62.7% inter:89.3%
[libx264 @ 0xb4000077c74403d0] coded y,uvDC,uvAC intra: 34.0% 44.8% 13.0% inter: 5.4% 11.2% 0.6%
[libx264 @ 0xb4000077c74403d0] i16 v,h,dc,p: 27% 45%  8% 20%
[libx264 @ 0xb4000077c74403d0] i8 v,h,dc,ddl,ddr,vr,hd,vl,hu: 26% 15% 44%  3%  2%  3%  2%  3%  2%
[libx264 @ 0xb4000077c74403d0] i4 v,h,dc,ddl,ddr,vr,hd,vl,hu: 14% 64% 10%  2%  2%  3%  2%  2%  1%
[libx264 @ 0xb4000077c74403d0] i8c dc,h,v,p: 55% 22% 19%  3%
[libx264 @ 0xb4000077c74403d0] Weighted P-Frames: Y:4.9% UV:3.9%
[libx264 @ 0xb4000077c74403d0] ref P L0: 58.6%  6.0% 26.5%  8.7%  0.3%
[libx264 @ 0xb4000077c74403d0] ref B L0: 75.9% 18.9%  5.2%
[libx264 @ 0xb4000077c74403d0] ref B L1: 93.4%  6.6%
[libx264 @ 0xb4000077c74403d0] kb/s:2029.98
[aac @ 0xb4000077c743e9f0] Qavg: 1420.264
```
### 6.1.2 h264_mediacodec
```
$ffmpeg -loglevel info  -y -i test.m2ts -c:v h264_mediacodec test-mc4.mp4
ffmpeg version 6.1.2 Copyright (c) 2000-2024 the FFmpeg developers
  built with Android (12470979, +pgo, +bolt, +lto, +mlgo, based on r522817c) clang version 18.0.3 (https://android.googlesource.com/toolchain/llvm-proje
ct d8003a456d14a3deb8054cdaa529ffbf02d9b262)
  configuration: --arch=aarch64 --as=aarch64-linux-android-clang --cc=aarch64-linux-android-clang --cxx=aarch64-linux-android-clang++ --nm=llvm-nm --ar=
llvm-ar --ranlib=llvm-ranlib --pkg-config=/home/builder/.termux-build/_cache/android-r27c-api-24-v1/bin/pkg-config --strip=llvm-strip --cross-prefix=aar
ch64-linux-android- --disable-indevs --disable-outdevs --enable-indev=lavfi --disable-static --disable-symver --enable-cross-compile --enable-gnutls --e
nable-gpl --enable-version3 --enable-jni --enable-lcms2 --enable-libaom --enable-libass --enable-libbluray --enable-libdav1d --enable-libfontconfig --en
able-libfreetype --enable-libfribidi --enable-libgme --enable-libharfbuzz --enable-libmp3lame --enable-libopencore-amrnb --enable-libopencore-amrwb --en
able-libopenmpt --enable-libopus --enable-librav1e --enable-libsoxr --enable-libsrt --enable-libssh --enable-libsvtav1 --enable-libtheora --enable-libv4
l2 --enable-libvidstab --enable-libvmaf --enable-libvo-amrwbenc --enable-libvorbis --enable-libvpx --enable-libwebp --enable-libx264 --enable-libx265 --
enable-libxml2 --enable-libxvid --enable-libzimg --enable-mediacodec --enable-opencl --enable-shared --prefix=/data/data/com.termux/files/usr --target-o
s=android --extra-libs=-landroid-glob --disable-vulkan --enable-neon --disable-libfdk-aac
  libavutil      58. 29.100 / 58. 29.100
  libavcodec     60. 31.102 / 60. 31.102
  libavformat    60. 16.100 / 60. 16.100
  libavdevice    60.  3.100 / 60.  3.100
  libavfilter     9. 12.100 /  9. 12.100
  libswscale      7.  5.100 /  7.  5.100
  libswresample   4. 12.100 /  4. 12.100
  libpostproc    57.  3.100 / 57.  3.100
Input #0, mpegts, from 'test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #0:0[0x1011]: Video: mpeg2video (Main) ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top first), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 t
br, 90k tbn
    Side data:
      cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #0:1[0x1100]: Audio: aac (LC) ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 -> #0:0 (mpeg2video (native) -> h264 (h264_mediacodec))
  Stream #0:1 -> #0:1 (aac (native) -> aac (native))
Press [q] to stop, [?] for help
[h264_mediacodec @ 0xb400007994ce2820] Use 1 as the default MediaFormat i-frame-interval, please set gop_size properly (>= fps)
[h264_mediacodec @ 0xb400007994ce2820] Mediacodec encoder doesn't support AV_CODEC_FLAG_GLOBAL_HEADER. Use extract_extradata bsf when necessary.
Output #0, mp4, to 'test-mc4.mp4':
  Metadata:
    encoder         : Lavf60.16.100
  Stream #0:0: Video: h264 (avc1 / 0x31637661), yuv420p(tv, bt709, top coded first (swapped)), 1440x1080 [SAR 4:3 DAR 16:9], q=2-31, 200 kb/s, 29.97 fps
, 30k tbn
    Metadata:
      encoder         : Lavc60.31.102 h264_mediacodec
  Stream #0:1: Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 128 kb/s
    Metadata:
      encoder         : Lavc60.31.102 aac
[mp4 @ 0xb400007824ceb410] Timestamps are unset in a packet for stream 0. This is deprecated and will stop working in the future. Fix your code to set t
he timestamps properly
[mp4 @ 0xb400007824ceb410] Encoder did not produce proper pts, making some up.
[out#0/mp4 @ 0xb400007924ce9c10] video:52508kB audio:1920kB subtitle:0kB other streams:0kB global headers:0kB muxing overhead: 0.188810%
frame= 4393 fps= 39 q=-0.0 Lsize=   54531kB time=00:02:00.08 bitrate=3720.0kbits/s dup=7 drop=0 speed=1.08x
[aac @ 0xb400007994ce5be0] Qavg: 1420.264
```
### 6.1.2 av1_mediacodec
エラー出ないけど壊れてるみたい たぶんhw対応してないのでしょう(未確認)  
```
$ffmpeg -loglevel info  -y -i test.m2ts -c:v av1_mediacodec test-mca.mp4
ffmpeg version 6.1.2 Copyright (c) 2000-2024 the FFmpeg developers
  built with Android (12470979, +pgo, +bolt, +lto, +mlgo, based on r522817c) clang version 18.0.3 (https://android.googlesource.com/toolchain/llvm-proje
ct d8003a456d14a3deb8054cdaa529ffbf02d9b262)
  configuration: --arch=aarch64 --as=aarch64-linux-android-clang --cc=aarch64-linux-android-clang --cxx=aarch64-linux-android-clang++ --nm=llvm-nm --ar=
llvm-ar --ranlib=llvm-ranlib --pkg-config=/home/builder/.termux-build/_cache/android-r27c-api-24-v1/bin/pkg-config --strip=llvm-strip --cross-prefix=aar
ch64-linux-android- --disable-indevs --disable-outdevs --enable-indev=lavfi --disable-static --disable-symver --enable-cross-compile --enable-gnutls --e
nable-gpl --enable-version3 --enable-jni --enable-lcms2 --enable-libaom --enable-libass --enable-libbluray --enable-libdav1d --enable-libfontconfig --en
able-libfreetype --enable-libfribidi --enable-libgme --enable-libharfbuzz --enable-libmp3lame --enable-libopencore-amrnb --enable-libopencore-amrwb --en
able-libopenmpt --enable-libopus --enable-librav1e --enable-libsoxr --enable-libsrt --enable-libssh --enable-libsvtav1 --enable-libtheora --enable-libv4
l2 --enable-libvidstab --enable-libvmaf --enable-libvo-amrwbenc --enable-libvorbis --enable-libvpx --enable-libwebp --enable-libx264 --enable-libx265 --
enable-libxml2 --enable-libxvid --enable-libzimg --enable-mediacodec --enable-opencl --enable-shared --prefix=/data/data/com.termux/files/usr --target-o
s=android --extra-libs=-landroid-glob --disable-vulkan --enable-neon --disable-libfdk-aac
  libavutil      58. 29.100 / 58. 29.100
  libavcodec     60. 31.102 / 60. 31.102
  libavformat    60. 16.100 / 60. 16.100
  libavdevice    60.  3.100 / 60.  3.100
  libavfilter     9. 12.100 /  9. 12.100
  libswscale      7.  5.100 /  7.  5.100
  libswresample   4. 12.100 /  4. 12.100
  libpostproc    57.  3.100 / 57.  3.100
Input #0, mpegts, from 'test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #0:0[0x1011]: Video: mpeg2video (Main) ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top first), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 t
br, 90k tbn
    Side data:
      cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #0:1[0x1100]: Audio: aac (LC) ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 -> #0:0 (mpeg2video (native) -> av1 (av1_mediacodec))
  Stream #0:1 -> #0:1 (aac (native) -> aac (native))
Press [q] to stop, [?] for help
[av1_mediacodec @ 0xb4000075646628b0] Use 1 as the default MediaFormat i-frame-interval, please set gop_size properly (>= fps)
[av1_mediacodec @ 0xb4000075646628b0] Mediacodec encoder doesn't support AV_CODEC_FLAG_GLOBAL_HEADER. Use extract_extradata bsf when necessary.
Output #0, mp4, to 'test-mca.mp4':
  Metadata:
    encoder         : Lavf60.16.100
  Stream #0:0: Video: av1 (av01 / 0x31307661), yuv420p(tv, bt709, top coded first (swapped)), 1440x1080 [SAR 4:3 DAR 16:9], q=2-31, 200 kb/s, 29.97 fps,
 30k tbn
    Metadata:
      encoder         : Lavc60.31.102 av1_mediacodec
  Stream #0:1: Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 128 kb/s
    Metadata:
      encoder         : Lavc60.31.102 aac
[out#0/mp4 @ 0xb4000075b466dbd0] video:8776kB audio:1920kB subtitle:0kB other streams:0kB global headers:0kB muxing overhead: 0.754641%
frame= 3600 fps= 27 q=-0.0 Lsize=   10777kB time=00:02:00.08 bitrate= 735.2kbits/s dup=7 drop=0 speed=0.915x
[aac @ 0xb400007564667ef0] Qavg: 1420.264
```
### vmaf h264_mediacodec
```
$ ffmpeg-7.1.exe -loglevel info -i test-mc4.mp4 -i ../test.m2ts -lavfi lib
vmaf='model=version=vmaf_v0.6.1' -f null -
ffmpeg version N-117568-g31b5b3badc-20241016 Copyright (c) 2000-2024 the FFmpeg developers
  built with gcc 14.2.0 (crosstool-NG 1.26.0.120_4d36f27)
  configuration: --prefix=/ffbuild/prefix --pkg-config-flags=--static --pkg-config=pkg-config --cros
s-prefix=x86_64-w64-mingw32- --arch=x86_64 --target-os=mingw32 --enable-gpl --enable-version3 --disa
ble-debug --disable-w32threads --enable-pthreads --enable-iconv --enable-zlib --enable-libfreetype -
-enable-libfribidi --enable-gmp --enable-libxml2 --enable-lzma --enable-fontconfig --enable-libharfb
uzz --enable-libvorbis --enable-opencl --disable-libpulse --enable-libvmaf --disable-libxcb --disabl
e-xlib --enable-amf --enable-libaom --enable-libaribb24 --enable-avisynth --enable-chromaprint --ena
ble-libdav1d --enable-libdavs2 --enable-libdvdread --enable-libdvdnav --disable-libfdk-aac --enable-
ffnvcodec --enable-cuda-llvm --enable-frei0r --enable-libgme --enable-libkvazaar --enable-libaribcap
tion --enable-libass --enable-libbluray --enable-libjxl --enable-libmp3lame --enable-libopus --enabl
e-librist --enable-libssh --enable-libtheora --enable-libvpx --enable-libwebp --enable-libzmq --enab
le-lv2 --enable-libvpl --enable-openal --enable-libopencore-amrnb --enable-libopencore-amrwb --enabl
e-libopenh264 --enable-libopenjpeg --enable-libopenmpt --enable-librav1e --enable-librubberband --en
able-schannel --enable-sdl2 --enable-libsoxr --enable-libsrt --enable-libsvtav1 --enable-libtwolame
--enable-libuavs3d --disable-libdrm --enable-vaapi --enable-libvidstab --enable-vulkan --enable-libs
haderc --enable-libplacebo --enable-libvvenc --enable-libx264 --enable-libx265 --enable-libxavs2 --e
nable-libxvid --enable-libzimg --enable-libzvbi --extra-cflags=-DLIBTWOLAME_STATIC --extra-cxxflags=
 --extra-libs=-lgomp --extra-ldflags=-pthread --extra-ldexeflags= --cc=x86_64-w64-mingw32-gcc --cxx=
x86_64-w64-mingw32-g++ --ar=x86_64-w64-mingw32-gcc-ar --ranlib=x86_64-w64-mingw32-gcc-ranlib --nm=x8
6_64-w64-mingw32-gcc-nm --extra-version=20241016
  libavutil      59. 44.100 / 59. 44.100
  libavcodec     61. 22.100 / 61. 22.100
  libavformat    61.  9.100 / 61.  9.100
  libavdevice    61.  4.100 / 61.  4.100
  libavfilter    10.  6.100 / 10.  6.100
  libswscale      8.  6.100 /  8.  6.100
  libswresample   5.  4.100 /  5.  4.100
  libpostproc    58.  4.100 / 58.  4.100
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'test-mc4.mp4':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2avc1mp41
    encoder         : Lavf60.16.100
  Duration: 00:02:00.12, start: 0.000000, bitrate: 3718 kb/s
  Stream #0:0[0x1](und): Video: h264 (High) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 14
40x1080, 3580 kb/s, SAR 4:3 DAR 16:9, 29.97 fps, 29.97 tbr, 30k tbn (default)
    Metadata:
      handler_name    : VideoHandler
      vendor_id       : [0][0][0][0]
      encoder         : Lavc60.31.102 h264_mediacodec
  Stream #0:1[0x2](und): Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 131 kb/s (defa
ult)
    Metadata:
      handler_name    : SoundHandler
      vendor_id       : [0][0][0][0]
Input #1, mpegts, from '../test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #1:0[0x1011]: Video: mpeg2video (Main) ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top firs
t), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 tbr, 90k tbn
    Side data:
      cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #1:1[0x1100]: Audio: aac (LC) ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 (h264) -> libvmaf
  Stream #1:0 (mpeg2video) -> libvmaf
  libvmaf:default -> Stream #0:0 (wrapped_avframe)
  Stream #0:1 -> #0:1 (aac (native) -> pcm_s16le (native))
Press [q] to stop, [?] for help
Output #0, null, to 'pipe:':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2avc1mp41
    encoder         : Lavf61.9.100
  Stream #0:0: Video: wrapped_avframe, yuv420p(tv, bt709, progressive), 1440x1080 [SAR 4:3 DAR 16:9]
, q=2-31, 200 kb/s, 29.97 fps, 29.97 tbn
    Metadata:
      encoder         : Lavc61.22.100 wrapped_avframe
  Stream #0:1(und): Audio: pcm_s16le, 48000 Hz, stereo, s16, 1536 kb/s (default)
    Metadata:
      encoder         : Lavc61.22.100 pcm_s16le
      handler_name    : SoundHandler
      vendor_id       : [0][0][0][0]
[Parsed_libvmaf_0 @ 000002272db71140] VMAF score: 56.301679
[out#0/null @ 000002272b669b00] video:1547KiB audio:22500KiB subtitle:0KiB other streams:0KiB global
 headers:0KiB muxing overhead: unknown
frame= 3600 fps= 15 q=-0.0 Lsize=N/A time=00:02:00.00 bitrate=N/A speed=0.51x
```
### vmaf av1_mediacodec
```
$ ffmpeg-7.1.exe -loglevel info -i test-mca.mp4 -i ../test.m2ts -lavfi lib
vmaf='model=version=vmaf_v0.6.1' -f null -
ffmpeg version N-117568-g31b5b3badc-20241016 Copyright (c) 2000-2024 the FFmpeg developers
  built with gcc 14.2.0 (crosstool-NG 1.26.0.120_4d36f27)
  configuration: --prefix=/ffbuild/prefix --pkg-config-flags=--static --pkg-config=pkg-config --cros
s-prefix=x86_64-w64-mingw32- --arch=x86_64 --target-os=mingw32 --enable-gpl --enable-version3 --disa
ble-debug --disable-w32threads --enable-pthreads --enable-iconv --enable-zlib --enable-libfreetype -
-enable-libfribidi --enable-gmp --enable-libxml2 --enable-lzma --enable-fontconfig --enable-libharfb
uzz --enable-libvorbis --enable-opencl --disable-libpulse --enable-libvmaf --disable-libxcb --disabl
e-xlib --enable-amf --enable-libaom --enable-libaribb24 --enable-avisynth --enable-chromaprint --ena
ble-libdav1d --enable-libdavs2 --enable-libdvdread --enable-libdvdnav --disable-libfdk-aac --enable-
ffnvcodec --enable-cuda-llvm --enable-frei0r --enable-libgme --enable-libkvazaar --enable-libaribcap
tion --enable-libass --enable-libbluray --enable-libjxl --enable-libmp3lame --enable-libopus --enabl
e-librist --enable-libssh --enable-libtheora --enable-libvpx --enable-libwebp --enable-libzmq --enab
le-lv2 --enable-libvpl --enable-openal --enable-libopencore-amrnb --enable-libopencore-amrwb --enabl
e-libopenh264 --enable-libopenjpeg --enable-libopenmpt --enable-librav1e --enable-librubberband --en
able-schannel --enable-sdl2 --enable-libsoxr --enable-libsrt --enable-libsvtav1 --enable-libtwolame
--enable-libuavs3d --disable-libdrm --enable-vaapi --enable-libvidstab --enable-vulkan --enable-libs
haderc --enable-libplacebo --enable-libvvenc --enable-libx264 --enable-libx265 --enable-libxavs2 --e
nable-libxvid --enable-libzimg --enable-libzvbi --extra-cflags=-DLIBTWOLAME_STATIC --extra-cxxflags=
 --extra-libs=-lgomp --extra-ldflags=-pthread --extra-ldexeflags= --cc=x86_64-w64-mingw32-gcc --cxx=
x86_64-w64-mingw32-g++ --ar=x86_64-w64-mingw32-gcc-ar --ranlib=x86_64-w64-mingw32-gcc-ranlib --nm=x8
6_64-w64-mingw32-gcc-nm --extra-version=20241016
  libavutil      59. 44.100 / 59. 44.100
  libavcodec     61. 22.100 / 61. 22.100
  libavformat    61.  9.100 / 61.  9.100
  libavdevice    61.  4.100 / 61.  4.100
  libavfilter    10.  6.100 / 10.  6.100
  libswscale      8.  6.100 /  8.  6.100
  libswresample   5.  4.100 /  5.  4.100
  libpostproc    58.  4.100 / 58.  4.100
[mov,mp4,m4a,3gp,3g2,mj2 @ 000001d53a8b0a40] moov atom not found
[in#0 @ 000001d53a8bcf00] Error opening input: Invalid data found when processing input
Error opening input file test-mca.mp4.
Error opening input files: Invalid data found when processing input
```
### lspcu
```
$lscpu | grep Model
Model name:                         Cortex-A55
Model:                              0
Model name:                         Cortex-A78
Model:                              1
```
## i5-7600T CPU @ 2.80GHz
### 7.1 h264_qsv
```
./ffmpeg-204-qs -loglevel info  -i ../test.m2ts -c:v h264_qsv -c:a copy -y  xtestq.mp4
ffmpeg version 7.1 Copyright (c) 2000-2024 the FFmpeg developers
  built with gcc 9 (Ubuntu 9.4.0-1ubuntu1~20.04.2)
  configuration: --enable-small --disable-doc --enable-nonfree --enable-version3 --enable-gpl --enable-libaribb24 --enable-libdav1d --enable-libfdk-aac --
enable-libsvtav1 --enable-libvpl --enable-libx264 --enable-libx265 --disable-encoder=aac
  libavutil      59. 39.100 / 59. 39.100
  libavcodec     61. 19.100 / 61. 19.100
  libavformat    61.  7.100 / 61.  7.100
  libavdevice    61.  3.100 / 61.  3.100
  libavfilter    10.  4.100 / 10.  4.100
  libswscale      8.  3.100 /  8.  3.100
  libswresample   5.  3.100 /  5.  3.100
  libpostproc    58.  3.100 / 58.  3.100
Input #0, mpegts, from '../test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #0:0[0x1011]: Video: mpeg2video ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top first), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 tbr, 90k t
bn
      Side data:
        cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #0:1[0x1100]: Audio: aac ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 -> #0:0 (mpeg2video (native) -> h264 (h264_qsv))
  Stream #0:1 -> #0:1 (copy)
Press [q] to stop, [?] for help
[h264_qsv @ 0x55dd81459280] Using the constant quantization parameter (CQP) by default. Please use the global_quality option and other options for a quali
ty-based mode or the b option and other options for a bitrate-based mode if the default is not the desired choice.
Output #0, mp4, to 'xtestq.mp4':
  Metadata:
    encoder         : Lavf61.7.100
  Stream #0:0: Video: h264 (avc1 / 0x31637661), nv12(tv, bt709, top coded first (swapped)), 1440x1080 [SAR 4:3 DAR 16:9], q=2-31, 29.97 fps, 30k tbn
      Metadata:
        encoder         : Lavc61.19.100 h264_qsv
      Side data:
        cpb: bitrate max/min/avg: 0/0/0 buffer size: 0 vbv_delay: N/A
  Stream #0:1: Audio: aac (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 255 kb/s
[h264_qsv @ 0x55dd81459280] Warning during encoding: incompatible video parameters (5)
    Last message repeated 133 times
[h264_qsv @ 0x55dd81459280] Warning during encoding: incompatible video parameters (5)ed=8.94x
    Last message repeated 146 times
[h264_qsv @ 0x55dd81459280] Warning during encoding: incompatible video parameters (5)ed=9.37x
    Last message repeated 143 times
[h264_qsv @ 0x55dd81459280] Warning during encoding: incompatible video parameters (5)ed=9.43x
    Last message repeated 140 times
[h264_qsv @ 0x55dd81459280] Warning during encoding: incompatible video parameters (5)ed=9.44x
    Last message repeated 137 times
[h264_qsv @ 0x55dd81459280] Warning during encoding: incompatible video parameters (5)ed=9.38x
    Last message repeated 157 times
[h264_qsv @ 0x55dd81459280] Warning during encoding: incompatible video parameters (5)ed=9.57x
    Last message repeated 153 times
[h264_qsv @ 0x55dd81459280] Warning during encoding: incompatible video parameters (5)ed=9.68x
    Last message repeated 155 times
[h264_qsv @ 0x55dd81459280] Warning during encoding: incompatible video parameters (5)ed=9.76x
    Last message repeated 153 times
[h264_qsv @ 0x55dd81459280] Warning during encoding: incompatible video parameters (5)ed=9.82x
    Last message repeated 127 times
[h264_qsv @ 0x55dd81459280] Warning during encoding: incompatible video parameters (5)ed= 9.7x
    Last message repeated 137 times
[h264_qsv @ 0x55dd81459280] Warning during encoding: incompatible video parameters (5)ed=9.65x
    Last message repeated 133 times
[h264_qsv @ 0x55dd81459280] Warning during encoding: incompatible video parameters (5)ed=9.59x
    Last message repeated 146 times
[h264_qsv @ 0x55dd81459280] Warning during encoding: incompatible video parameters (5)ed=9.61x
    Last message repeated 146 times
[h264_qsv @ 0x55dd81459280] Warning during encoding: incompatible video parameters (5)ed=9.62x
    Last message repeated 151 times
[h264_qsv @ 0x55dd81459280] Warning during encoding: incompatible video parameters (5)ed=9.65x
    Last message repeated 143 times
[h264_qsv @ 0x55dd81459280] Warning during encoding: incompatible video parameters (5)ed=9.65x
    Last message repeated 142 times
[h264_qsv @ 0x55dd81459280] Warning during encoding: incompatible video parameters (5)ed=9.65x
    Last message repeated 134 times
[h264_qsv @ 0x55dd81459280] Warning during encoding: incompatible video parameters (5)ed=9.61x
    Last message repeated 112 times
[h264_qsv @ 0x55dd81459280] Warning during encoding: incompatible video parameters (5)ed= 9.5x
    Last message repeated 114 times
[h264_qsv @ 0x55dd81459280] Warning during encoding: incompatible video parameters (5)ed= 9.4x
    Last message repeated 113 times
[h264_qsv @ 0x55dd81459280] Warning during encoding: incompatible video parameters (5)ed=9.31x
    Last message repeated 109 times
[h264_qsv @ 0x55dd81459280] Warning during encoding: incompatible video parameters (5)ed=9.22x
    Last message repeated 111 times
[h264_qsv @ 0x55dd81459280] Warning during encoding: incompatible video parameters (5)ed=9.15x
    Last message repeated 117 times
[h264_qsv @ 0x55dd81459280] Warning during encoding: incompatible video parameters (5)ed=9.09x
    Last message repeated 112 times
[h264_qsv @ 0x55dd81459280] Warning during encoding: incompatible video parameters (5)ed=9.03x
    Last message repeated 113 times
[h264_qsv @ 0x55dd81459280] Warning during encoding: incompatible video parameters (5)ed=8.97x
    Last message repeated 83 times
[out#0/mp4 @ 0x55dd8159af40] video:18957KiB audio:3746KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: 0.330731%
frame= 3593 fps=264 q=33.0 Lsize=   22778KiB time=00:01:59.98 bitrate=1555.2kbits/s speed=8.82x
```
### 7.1 hevc_qsv 
```
./ffmpeg-204-qs -loglevel verbose  -i ../test.m2ts -c:v hevc_qsv -c:a copy -y  xtestq5.mp4
ffmpeg version 7.1 Copyright (c) 2000-2024 the FFmpeg developers
  built with gcc 9 (Ubuntu 9.4.0-1ubuntu1~20.04.2)
  configuration: --enable-small --disable-doc --enable-nonfree --enable-version3 --enable-gpl --enable-libaribb24 --enable-libdav1d --enable-libfdk-aac --
enable-libsvtav1 --enable-libvpl --enable-libx264 --enable-libx265 --disable-encoder=aac
  libavutil      59. 39.100 / 59. 39.100
  libavcodec     61. 19.100 / 61. 19.100
  libavformat    61.  7.100 / 61.  7.100
  libavdevice    61.  3.100 / 61.  3.100
  libavfilter    10.  4.100 / 10.  4.100
  libswscale      8.  3.100 /  8.  3.100
  libswresample   5.  3.100 /  5.  3.100
  libpostproc    58.  3.100 / 58.  3.100
[mpegts @ 0x55f152943780] max_analyze_duration 5000000 reached at 5013333 microseconds st:1
Input #0, mpegts, from '../test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #0:0[0x1011]: Video: mpeg2video, 1 reference frame ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top first, left), 1440x1080 [SAR 4:3 DAR 16:9], 29
.97 fps, 29.97 tbr, 90k tbn
      Side data:
        cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #0:1[0x1100]: Audio: aac ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
[out#0/mp4 @ 0x55f152c2df40] No explicit maps, mapping streams automatically...
[vost#0:0/hevc_qsv @ 0x55f1529ed900] Created video stream from input stream 0:0
[aost#0:1/copy @ 0x55f152b47780] Created audio stream from input stream 0:1
Stream mapping:
  Stream #0:0 -> #0:0 (mpeg2video (native) -> hevc (hevc_qsv))
  Stream #0:1 -> #0:1 (copy)
[vost#0:0/hevc_qsv @ 0x55f1529ed900] Starting thread...
[vf#0:0 @ 0x55f152af7f80] Starting thread...
[vist#0:0/mpeg2video @ 0x55f1529ed680] [dec:mpeg2video @ 0x55f152992480] Starting thread...
[in#0/mpegts @ 0x55f152943440] Starting thread...
Press [q] to stop, [?] for help
[graph -1 input from stream 0:0 @ 0x7f8bf8002440] w:1440 h:1080 pixfmt:yuv420p tb:1/90000 fr:30000/1001 sar:4/3 csp:bt709 range:tv
[auto_scale_0 @ 0x7f8bf8002c80] w:iw h:ih flags:'' interl:0
[format @ 0x7f8bf8003f40] auto-inserting filter 'auto_scale_0' between the filter 'Parsed_null_0' and the filter 'format'
[auto_scale_0 @ 0x7f8bf8002c80] w:1440 h:1080 fmt:yuv420p csp:bt709 range:tv sar:4/3 -> w:1440 h:1080 fmt:nv12 csp:bt709 range:tv sar:4/3 flags:0x00000004
[auto_scale_0 @ 0x7f8bf8002c80] [framesync @ 0x7f8bf8005ca8] Selected 1/90000 time base
[auto_scale_0 @ 0x7f8bf8002c80] [framesync @ 0x7f8bf8005ca8] Sync level 1
[graph -1 input from stream 0:0 @ 0x7f8bf8002440] video frame properties congruent with link at pts_time: 0.157833
[hevc_qsv @ 0x55f152aec280] Encoder: input is system memory surface
[hevc_qsv @ 0x55f152aec280] Use Intel(R) oneVPL to create MFX session, the required implementation version is 1.1
[AVHWDeviceContext @ 0x7f8bf8076dc0] Trying to use DRM render node for device 0, with matching vendor id (0x8086).
[AVHWDeviceContext @ 0x7f8bf8076dc0] libva: VA-API version 1.10.0
[AVHWDeviceContext @ 0x7f8bf8076dc0] libva: User requested driver 'iHD'
[AVHWDeviceContext @ 0x7f8bf8076dc0] libva: Trying to open /usr/local/lib/dri/iHD_drv_video.so
[AVHWDeviceContext @ 0x7f8bf8076dc0] libva: Found init function __vaDriverInit_1_10
[AVHWDeviceContext @ 0x7f8bf8076dc0] libva: va_openDriver() returns 0
[AVHWDeviceContext @ 0x7f8bf8076dc0] Initialised VAAPI connection: version 1.10
[AVHWDeviceContext @ 0x7f8bf8076dc0] VAAPI driver: Intel iHD driver for Intel(R) Gen Graphics - 20.4.2 (b1149d40).
[AVHWDeviceContext @ 0x7f8bf8076dc0] Driver not found in known nonstandard list, using standard behaviour.
[hevc_qsv @ 0x55f152aec280] Initialized an internal MFX session using hardware accelerated implementation
[hevc_qsv @ 0x55f152aec280] Using the constant quantization parameter (CQP) by default. Please use the global_quality option and other options for a quali
ty-based mode or the b option and other options for a bitrate-based mode if the default is not the desired choice.
[hevc_qsv @ 0x55f152aec280] Using the constant quantization parameter (CQP) ratecontrol method
[hevc_qsv @ 0x55f152aec280] profile: hevc main; level: 296
[hevc_qsv @ 0x55f152aec280] GopPicSize: 248; GopRefDist: 8; GopOptFlag:; IdrInterval: 1
[hevc_qsv @ 0x55f152aec280] TargetUsage: 4; RateControlMethod: CQP
[hevc_qsv @ 0x55f152aec280] QPI: 20; QPP: 26; QPB: 33
[hevc_qsv @ 0x55f152aec280] NumSlice: 1; NumRefFrame: 4
[hevc_qsv @ 0x55f152aec280] RateDistortionOpt: unknown
[hevc_qsv @ 0x55f152aec280] RecoveryPointSEI: unknown
[hevc_qsv @ 0x55f152aec280] VDENC: OFF
[hevc_qsv @ 0x55f152aec280] NalHrdConformance: OFF; VuiNalHrdParameters: OFF
[hevc_qsv @ 0x55f152aec280] FrameRateExtD: 1001; FrameRateExtN: 30000
[hevc_qsv @ 0x55f152aec280] IntRefType: 0; IntRefCycleSize: 0; IntRefQPDelta: 0
[hevc_qsv @ 0x55f152aec280] MaxFrameSize: 0; MaxSliceSize: 0
[hevc_qsv @ 0x55f152aec280] BitrateLimit: unknown; MBBRC: OFF; ExtBRC: OFF
[hevc_qsv @ 0x55f152aec280] Trellis: auto
[hevc_qsv @ 0x55f152aec280] RepeatPPS: OFF; NumMbPerSlice: 0; LookAheadDS: unknown
[hevc_qsv @ 0x55f152aec280] AdaptiveI: unknown; AdaptiveB: unknown; BRefType:pyramid
[hevc_qsv @ 0x55f152aec280] MinQPI: 1; MaxQPI: 51; MinQPP: 1; MaxQPP: 51; MinQPB: 1; MaxQPB: 51
[hevc_qsv @ 0x55f152aec280] DisableDeblockingIdc: 0
[hevc_qsv @ 0x55f152aec280] SkipFrame: no_skip
[hevc_qsv @ 0x55f152aec280] PRefType: default
[hevc_qsv @ 0x55f152aec280] GPB: ON
[hevc_qsv @ 0x55f152aec280] TransformSkip: OFF
[hevc_qsv @ 0x55f152aec280] IntRefCycleDist: 0
[hevc_qsv @ 0x55f152aec280] LowDelayBRC: OFF
[hevc_qsv @ 0x55f152aec280] MaxFrameSizeI: 0; MaxFrameSizeP: 0
[hevc_qsv @ 0x55f152aec280] ScenarioInfo: 0
[hevc_qsv @ 0x55f152aec280] NumTileColumns: 1; NumTileRows: 1
Output #0, mp4, to 'xtestq5.mp4':
  Metadata:
    encoder         : Lavf61.7.100
  Stream #0:0: Video: hevc, 1 reference frame (hev1 / 0x31766568), nv12(tv, bt709, top coded first (swapped), left), 1440x1080 [SAR 4:3 DAR 16:9], q=2-31,
 29.97 fps, 30k tbn
      Metadata:
        encoder         : Lavc61.19.100 hevc_qsv
      Side data:
        cpb: bitrate max/min/avg: 0/0/0 buffer size: 0 vbv_delay: N/A
  Stream #0:1: Audio: aac (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 255 kb/s
[out#0/mp4 @ 0x55f152c2df40] Starting thread...
Automatically inserted bitstream filter 'aac_adtstoasc'; args=''
[in#0/mpegts @ 0x55f152943440] EOF while reading input:56.98 bitrate=1093.5kbits/s speed=3.71x
[in#0/mpegts @ 0x55f152943440] Terminating thread with return code 0 (success)
[vist#0:0/mpeg2video @ 0x55f1529ed680] [dec:mpeg2video @ 0x55f152992480] Decoder thread received EOF packet
[vist#0:0/mpeg2video @ 0x55f1529ed680] [dec:mpeg2video @ 0x55f152992480] Decoder returned EOF, finishing
[vist#0:0/mpeg2video @ 0x55f1529ed680] [dec:mpeg2video @ 0x55f152992480] Terminating thread with return code 0 (success)
[auto_scale_0 @ 0x7f8bf8002c80] [framesync @ 0x7f8bf8005ca8] Sync level 0
[vf#0:0 @ 0x55f152af7f80] Filtergraph returned EOF, finishing
[vf#0:0 @ 0x55f152af7f80] All consumers returned EOF
[vf#0:0 @ 0x55f152af7f80] Terminating thread with return code 0 (success)
[vost#0:0/hevc_qsv @ 0x55f1529ed900] Encoder thread received EOF
[vost#0:0/hevc_qsv @ 0x55f1529ed900] Non-monotonic DTS; previous: 3592589, current: 3591588; changing to 3592590. This may result in incorrect timestamps
in the output file.
[vost#0:0/hevc_qsv @ 0x55f1529ed900] Non-monotonic DTS; previous: 3592590, current: 3592589; changing to 3592591. This may result in incorrect timestamps
in the output file.
[vost#0:0/hevc_qsv @ 0x55f1529ed900] Terminating thread with return code 0 (success)
[out#0/mp4 @ 0x55f152c2df40] All streams finished
[out#0/mp4 @ 0x55f152c2df40] Terminating thread with return code 0 (success)
[AVIOContext @ 0x55f152c20d40] Statistics: 16946611 bytes written, 2 seeks, 68 writeouts
[out#0/mp4 @ 0x55f152c2df40] Output file #0 (xtestq5.mp4):
[out#0/mp4 @ 0x55f152c2df40]   Output stream #0:0 (video): 3593 frames encoded; 3593 packets muxed (13023805 bytes);
[out#0/mp4 @ 0x55f152c2df40]   Output stream #0:1 (audio): 5625 packets muxed (3836250 bytes);
[out#0/mp4 @ 0x55f152c2df40]   Total: 9218 packets (16860055 bytes) muxed
[out#0/mp4 @ 0x55f152c2df40] video:12719KiB audio:3746KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: 0.513355%
frame= 3593 fps=111 q=-0.0 Lsize=   16549KiB time=00:01:59.91 bitrate=1130.5kbits/s speed=3.69x
[in#0/mpegts @ 0x55f152943440] Input file #0 (../test.m2ts):
[in#0/mpegts @ 0x55f152943440]   Input stream #0:0 (video): 3595 packets read (133140569 bytes); 3593 frames decoded; 0 decode errors;
[in#0/mpegts @ 0x55f152943440]   Input stream #0:1 (audio): 5625 packets read (3836250 bytes);
[in#0/mpegts @ 0x55f152943440]   Total: 9220 packets (136976819 bytes) demuxed
[AVIOContext @ 0x55f15294c400] Statistics: 148662416 bytes read, 2 seeks
```
### 7.1 H265
```
./ffmpeg-204-qs -loglevel info -i ../test.m2ts -c:v libx265  -c:a copy -y  xtest-5.mp4
ffmpeg version 7.1 Copyright (c) 2000-2024 the FFmpeg developers
  built with gcc 9 (Ubuntu 9.4.0-1ubuntu1~20.04.2)
  configuration: --enable-small --disable-doc --enable-nonfree --enable-version3 --enable-gpl --enable-libaribb24 --enable-libdav1d --enable-libfdk-aac --
enable-libsvtav1 --enable-libvpl --enable-libx264 --enable-libx265 --disable-encoder=aac
  libavutil      59. 39.100 / 59. 39.100
  libavcodec     61. 19.100 / 61. 19.100
  libavformat    61.  7.100 / 61.  7.100
  libavdevice    61.  3.100 / 61.  3.100
  libavfilter    10.  4.100 / 10.  4.100
  libswscale      8.  3.100 /  8.  3.100
  libswresample   5.  3.100 /  5.  3.100
  libpostproc    58.  3.100 / 58.  3.100
Input #0, mpegts, from '../test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #0:0[0x1011]: Video: mpeg2video ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top first), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 tbr, 90k t
bn
      Side data:
        cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #0:1[0x1100]: Audio: aac ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 -> #0:0 (mpeg2video (native) -> hevc (libx265))
  Stream #0:1 -> #0:1 (copy)
Press [q] to stop, [?] for help
x265 [info]: HEVC encoder version 3.2.1+1-b5c86a64bbbe
x265 [info]: build info [Linux][GCC 9.3.0][64 bit] 8bit+10bit+12bit
x265 [info]: using cpu capabilities: MMX2 SSE2Fast LZCNT SSSE3 SSE4.2 AVX FMA3 BMI2 AVX2
x265 [info]: Main profile, Level-4 (Main tier)
x265 [info]: Thread pool created using 4 threads
x265 [info]: Slices                              : 1
x265 [info]: frame threads / pool features       : 2 / wpp(17 rows)
x265 [info]: Coding QT: max CU size, min CU size : 64 / 8
x265 [info]: Residual QT: max TU size, max depth : 32 / 1 inter / 1 intra
x265 [info]: ME / range / subpel / merge         : hex / 57 / 2 / 3
x265 [info]: Keyframe min / max / scenecut / bias: 25 / 250 / 40 / 5.00
x265 [info]: Lookahead / bframes / badapt        : 20 / 4 / 2
x265 [info]: b-pyramid / weightp / weightb       : 1 / 1 / 0
x265 [info]: References / ref-limit  cu / depth  : 3 / off / on
x265 [info]: AQ: mode / str / qg-size / cu-tree  : 2 / 1.0 / 32 / 1
x265 [info]: Rate Control / qCompress            : CRF-28.0 / 0.60
x265 [info]: tools: rd=3 psy-rd=2.00 early-skip rskip signhide tmvp b-intra
x265 [info]: tools: strong-intra-smoothing lslices=6 deblock sao
Output #0, mp4, to 'xtest-5.mp4':
  Metadata:
    encoder         : Lavf61.7.100
  Stream #0:0: Video: hevc (hev1 / 0x31766568), yuv420p(tv, bt709, top coded first (swapped)), 1440x1080 [SAR 4:3 DAR 16:9], q=2-31, 29.97 fps, 30k tbn
      Metadata:
        encoder         : Lavc61.19.100 libx265
      Side data:
        cpb: bitrate max/min/avg: 0/0/0 buffer size: 0 vbv_delay: N/A
  Stream #0:1: Audio: aac (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 255 kb/s
[out#0/mp4 @ 0x561840e7df40] video:8575KiB audio:3746KiB subtitle:0KiB other streams:0KiB global headers:2KiB muxing overhead: 0.696403%
frame= 3593 fps= 23 q=29.1 Lsize=   12407KiB time=00:01:59.98 bitrate= 847.1kbits/s speed=0.782x
x265 [info]: frame I:     39, Avg QP:27.93  kb/s: 9626.32
x265 [info]: frame P:   1170, Avg QP:30.94  kb/s: 953.90
x265 [info]: frame B:   2384, Avg QP:35.08  kb/s: 256.00
x265 [info]: Weighted P-Frames: Y:2.2% UV:1.4%
x265 [info]: consecutive B-frames: 9.5% 5.0% 71.5% 6.7% 7.3%

encoded 3593 frames in 153.49s (23.41 fps), 584.97 kb/s, Avg QP:33.65
```
### 7.1 SVT-AV1
```
./ffmpeg-204-qs -loglevel info  -i ../test.m2ts -c:v libsvtav1 -crf 40  -c:a copy -y  xtest-a.mp4
ffmpeg version 7.1 Copyright (c) 2000-2024 the FFmpeg developers
  built with gcc 9 (Ubuntu 9.4.0-1ubuntu1~20.04.2)
  configuration: --enable-small --disable-doc --enable-nonfree --enable-version3 --enable-gpl --enable-libaribb24 --enable-libdav1d --enable-libfdk-aac --
enable-libsvtav1 --enable-libvpl --enable-libx264 --enable-libx265 --disable-encoder=aac
  libavutil      59. 39.100 / 59. 39.100
  libavcodec     61. 19.100 / 61. 19.100
  libavformat    61.  7.100 / 61.  7.100
  libavdevice    61.  3.100 / 61.  3.100
  libavfilter    10.  4.100 / 10.  4.100
  libswscale      8.  3.100 /  8.  3.100
  libswresample   5.  3.100 /  5.  3.100
  libpostproc    58.  3.100 / 58.  3.100
Input #0, mpegts, from '../test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #0:0[0x1011]: Video: mpeg2video ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top first), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 tbr, 90k t
bn
      Side data:
        cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #0:1[0x1100]: Audio: aac ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 -> #0:0 (mpeg2video (native) -> av1 (libsvtav1))
  Stream #0:1 -> #0:1 (copy)
Press [q] to stop, [?] for help
Svt[info]: -------------------------------------------
Svt[info]: SVT [version]:       SVT-AV1 Encoder Lib v2.3.0
Svt[info]: SVT [build]  :       GCC 9.4.0        64 bit
Svt[info]: LIB Build date: Nov 22 2024 13:21:20
Svt[info]: -------------------------------------------
Svt[info]: Level of Parallelism: 3
Svt[info]: Number of PPCS 42
Svt[info]: [asm level on system : up to avx2]
Svt[info]: [asm level selected : up to avx2]
Svt[info]: -------------------------------------------
Svt[info]: SVT [config]: main profile   tier (auto)     level (auto)
Svt[info]: SVT [config]: width / height / fps numerator / fps denominator               : 1440 / 1080 / 30000 / 1001
Svt[info]: SVT [config]: bit-depth / color format                                       : 8 / YUV420
Svt[info]: SVT [config]: preset / tune / pred struct                                    : 10 / PSNR / random access
Svt[info]: SVT [config]: gop size / mini-gop size / key-frame type                      : 161 / 16 / key frame
Svt[info]: SVT [config]: BRC mode / rate factor                                         : CRF / 40
Svt[info]: SVT [config]: AQ mode / variance boost                                       : 2 / 0
Svt[info]: -------------------------------------------
Output #0, mp4, to 'xtest-a.mp4':
  Metadata:
    encoder         : Lavf61.7.100
  Stream #0:0: Video: av1 (av01 / 0x31307661), yuv420p(tv, bt709, top coded first (swapped)), 1440x1080 [SAR 4:3 DAR 16:9], q=2-31, 29.97 fps, 30k tbn
      Metadata:
        encoder         : Lavc61.19.100 libsvtav1
  Stream #0:1: Audio: aac (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 255 kb/s
[out#0/mp4 @ 0x55958a35b600] video:8082KiB audio:3746KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: 0.417056%
frame= 3593 fps= 66 q=38.0 Lsize=   11877KiB time=00:02:00.00 bitrate= 810.8kbits/s speed=2.21x
```
### 7.1 x264
```
./ffmpeg-204-qs -loglevel info  -i ../test.m2ts -c:v libx264  -c:a copy -y  xtest-4.mp4
ffmpeg version 7.1 Copyright (c) 2000-2024 the FFmpeg developers
  built with gcc 9 (Ubuntu 9.4.0-1ubuntu1~20.04.2)
  configuration: --enable-small --disable-doc --enable-nonfree --enable-version3 --enable-gpl --enable-libaribb24 --enable-libdav1d --enable-libfdk-aac --
enable-libsvtav1 --enable-libvpl --enable-libx264 --enable-libx265 --disable-encoder=aac
  libavutil      59. 39.100 / 59. 39.100
  libavcodec     61. 19.100 / 61. 19.100
  libavformat    61.  7.100 / 61.  7.100
  libavdevice    61.  3.100 / 61.  3.100
  libavfilter    10.  4.100 / 10.  4.100
  libswscale      8.  3.100 /  8.  3.100
  libswresample   5.  3.100 /  5.  3.100
  libpostproc    58.  3.100 / 58.  3.100
Input #0, mpegts, from '../test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #0:0[0x1011]: Video: mpeg2video ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top first), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 tbr, 90k t
bn
      Side data:
        cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #0:1[0x1100]: Audio: aac ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 -> #0:0 (mpeg2video (native) -> h264 (libx264))
  Stream #0:1 -> #0:1 (copy)
Press [q] to stop, [?] for help
[libx264 @ 0x55c37a48f280] using SAR=4/3
[libx264 @ 0x55c37a48f280] using cpu capabilities: MMX2 SSE2Fast SSSE3 SSE4.2 AVX FMA3 BMI2 AVX2
[libx264 @ 0x55c37a48f280] profile High, level 4.0
[libx264 @ 0x55c37a48f280] 264 - core 155 r2917 0a84d98 - H.264/MPEG-4 AVC codec - Copyleft 2003-2018 - http://www.videolan.org/x264.html - options: cabac
=1 ref=3 deblock=1:0:0 analyse=0x3:0x113 me=hex subme=7 psy=1 psy_rd=1.00:0.00 mixed_ref=1 me_range=16 chroma_me=1 trellis=1 8x8dct=1 cqm=0 deadzone=21,11
 fast_pskip=1 chroma_qp_offset=-2 threads=6 lookahead_threads=1 sliced_threads=0 nr=0 decimate=1 interlaced=0 bluray_compat=0 constrained_intra=0 bframes=
3 b_pyramid=2 b_adapt=1 b_bias=0 direct=1 weightb=1 open_gop=0 weightp=2 keyint=250 keyint_min=25 scenecut=40 intra_refresh=0 rc_lookahead=40 rc=crf mbtre
e=1 crf=23.0 qcomp=0.60 qpmin=0 qpmax=69 qpstep=4 ip_ratio=1.40 aq=1:1.00
Output #0, mp4, to 'xtest-4.mp4':
  Metadata:
    encoder         : Lavf61.7.100
  Stream #0:0: Video: h264 (avc1 / 0x31637661), yuv420p(tv, bt709, top coded first (swapped)), 1440x1080 [SAR 4:3 DAR 16:9], q=2-31, 29.97 fps, 30k tbn
      Metadata:
        encoder         : Lavc61.19.100 libx264
      Side data:
        cpb: bitrate max/min/avg: 0/0/0 buffer size: 0 vbv_delay: N/A
  Stream #0:1: Audio: aac (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 255 kb/s
[out#0/mp4 @ 0x55c37a5d0f40] video:29655KiB audio:3746KiB subtitle:0KiB other streams:0KiB global headers:0KiB muxing overhead: 0.233918%
frame= 3593 fps= 41 q=-1.0 Lsize=   33479KiB time=00:01:59.98 bitrate=2285.8kbits/s speed=1.37x
[libx264 @ 0x55c37a48f280] frame I:54    Avg QP:18.36  size: 68002
[libx264 @ 0x55c37a48f280] frame P:1073  Avg QP:21.10  size: 15638
[libx264 @ 0x55c37a48f280] frame B:2466  Avg QP:22.68  size:  4021
[libx264 @ 0x55c37a48f280] consecutive B-frames:  3.4%  6.4% 26.6% 63.6%
[libx264 @ 0x55c37a48f280] mb I  I16..4: 21.8% 70.5%  7.7%
[libx264 @ 0x55c37a48f280] mb P  I16..4:  4.9% 10.5%  1.2%  P16..4: 29.6%  4.7%  4.1%  0.0%  0.0%    skip:45.0%
[libx264 @ 0x55c37a48f280] mb B  I16..4:  0.6%  0.8%  0.1%  B16..8: 22.5%  1.0%  0.1%  direct: 2.9%  skip:72.1%  L0:45.9% L1:52.6% BI: 1.5%
[libx264 @ 0x55c37a48f280] 8x8 transform intra:63.7% inter:89.3%
[libx264 @ 0x55c37a48f280] coded y,uvDC,uvAC intra: 34.0% 44.4% 12.8% inter: 5.4% 11.2% 0.6%
[libx264 @ 0x55c37a48f280] i16 v,h,dc,p: 26% 46%  8% 20%
[libx264 @ 0x55c37a48f280] i8 v,h,dc,ddl,ddr,vr,hd,vl,hu: 30% 17% 39%  3%  2%  3%  2%  3%  2%
[libx264 @ 0x55c37a48f280] i4 v,h,dc,ddl,ddr,vr,hd,vl,hu: 15% 64%  8%  2%  2%  3%  2%  2%  1%
[libx264 @ 0x55c37a48f280] i8c dc,h,v,p: 56% 22% 19%  3%
[libx264 @ 0x55c37a48f280] Weighted P-Frames: Y:4.9% UV:4.0%
[libx264 @ 0x55c37a48f280] ref P L0: 58.8%  5.9% 26.4%  8.6%  0.2%
[libx264 @ 0x55c37a48f280] ref B L0: 75.9% 18.8%  5.3%
[libx264 @ 0x55c37a48f280] ref B L1: 93.5%  6.5%
[libx264 @ 0x55c37a48f280] kb/s:2024.07
```
### VMAF 7.1 hevc_qsv
```
$ ffmpeg-7.1.exe -loglevel info -i xtestq5.mp4 -i ../test.m2ts -lavfi libvmaf='model=version=vmaf_v0
.6.1' -f null -
ffmpeg version N-117568-g31b5b3badc-20241016 Copyright (c) 2000-2024 the FFmpeg developers
  built with gcc 14.2.0 (crosstool-NG 1.26.0.120_4d36f27)
  configuration: --prefix=/ffbuild/prefix --pkg-config-flags=--static --pkg-config=pkg-config --cros
s-prefix=x86_64-w64-mingw32- --arch=x86_64 --target-os=mingw32 --enable-gpl --enable-version3 --disa
ble-debug --disable-w32threads --enable-pthreads --enable-iconv --enable-zlib --enable-libfreetype -
-enable-libfribidi --enable-gmp --enable-libxml2 --enable-lzma --enable-fontconfig --enable-libharfb
uzz --enable-libvorbis --enable-opencl --disable-libpulse --enable-libvmaf --disable-libxcb --disabl
e-xlib --enable-amf --enable-libaom --enable-libaribb24 --enable-avisynth --enable-chromaprint --ena
ble-libdav1d --enable-libdavs2 --enable-libdvdread --enable-libdvdnav --disable-libfdk-aac --enable-
ffnvcodec --enable-cuda-llvm --enable-frei0r --enable-libgme --enable-libkvazaar --enable-libaribcap
tion --enable-libass --enable-libbluray --enable-libjxl --enable-libmp3lame --enable-libopus --enabl
e-librist --enable-libssh --enable-libtheora --enable-libvpx --enable-libwebp --enable-libzmq --enab
le-lv2 --enable-libvpl --enable-openal --enable-libopencore-amrnb --enable-libopencore-amrwb --enabl
e-libopenh264 --enable-libopenjpeg --enable-libopenmpt --enable-librav1e --enable-librubberband --en
able-schannel --enable-sdl2 --enable-libsoxr --enable-libsrt --enable-libsvtav1 --enable-libtwolame
--enable-libuavs3d --disable-libdrm --enable-vaapi --enable-libvidstab --enable-vulkan --enable-libs
haderc --enable-libplacebo --enable-libvvenc --enable-libx264 --enable-libx265 --enable-libxavs2 --e
nable-libxvid --enable-libzimg --enable-libzvbi --extra-cflags=-DLIBTWOLAME_STATIC --extra-cxxflags=
 --extra-libs=-lgomp --extra-ldflags=-pthread --extra-ldexeflags= --cc=x86_64-w64-mingw32-gcc --cxx=
x86_64-w64-mingw32-g++ --ar=x86_64-w64-mingw32-gcc-ar --ranlib=x86_64-w64-mingw32-gcc-ranlib --nm=x8
6_64-w64-mingw32-gcc-nm --extra-version=20241016
  libavutil      59. 44.100 / 59. 44.100
  libavcodec     61. 22.100 / 61. 22.100
  libavformat    61.  9.100 / 61.  9.100
  libavdevice    61.  4.100 / 61.  4.100
  libavfilter    10.  6.100 / 10.  6.100
  libswscale      8.  6.100 /  8.  6.100
  libswresample   5.  4.100 /  5.  4.100
  libpostproc    58.  4.100 / 58.  4.100
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'xtestq5.mp4':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2mp41
    encoder         : Lavf61.7.100
  Duration: 00:02:00.05, start: 0.000000, bitrate: 1129 kb/s
  Stream #0:0[0x1](und): Video: hevc (Main) (hev1 / 0x31766568), yuv420p(tv, bt709, top coded first
(swapped)), 1440x1080 [SAR 4:3 DAR 16:9], 869 kb/s, 29.97 fps, 29.97 tbr, 30k tbn (default)
    Metadata:
      handler_name    : VideoHandler
      vendor_id       : [0][0][0][0]
      encoder         : Lavc61.19.100 hevc_qsv
  Stream #0:1[0x2](und): Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 252 kb/s (defa
ult)
    Metadata:
      handler_name    : SoundHandler
      vendor_id       : [0][0][0][0]
Input #1, mpegts, from '../test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #1:0[0x1011]: Video: mpeg2video (Main) ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top firs
t), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 tbr, 90k tbn
    Side data:
      cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #1:1[0x1100]: Audio: aac (LC) ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 (hevc) -> libvmaf
  Stream #1:0 (mpeg2video) -> libvmaf
  libvmaf:default -> Stream #0:0 (wrapped_avframe)
  Stream #0:1 -> #0:1 (aac (native) -> pcm_s16le (native))
Press [q] to stop, [?] for help
Output #0, null, to 'pipe:':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2mp41
    encoder         : Lavf61.9.100
  Stream #0:0: Video: wrapped_avframe, yuv420p(tv, bt709, progressive), 1440x1080 [SAR 4:3 DAR 16:9]
, q=2-31, 200 kb/s, 29.97 fps, 29.97 tbn
    Metadata:
      encoder         : Lavc61.22.100 wrapped_avframe
  Stream #0:1(und): Audio: pcm_s16le, 48000 Hz, stereo, s16, 1536 kb/s (default)
    Metadata:
      encoder         : Lavc61.22.100 pcm_s16le
      handler_name    : SoundHandler
      vendor_id       : [0][0][0][0]
[Parsed_libvmaf_0 @ 00000277a7d4f8c0] VMAF score: 58.365238e=N/A speed=0.511x
[out#0/null @ 00000277a7c8bfc0] video:1544KiB audio:22500KiB subtitle:0KiB other streams:0KiB global
 headers:0KiB muxing overhead: unknown
frame= 3593 fps= 15 q=-0.0 Lsize=N/A time=00:02:00.00 bitrate=N/A speed=0.511x
```
### VMAF 7.1 h264_qsv
```
$ ffmpeg-7.1.exe -loglevel info -i xtestq.mp4 -i ../test.m2ts -lavfi libvmaf='model=version=vmaf_v0.
6.1' -f null -
ffmpeg version N-117568-g31b5b3badc-20241016 Copyright (c) 2000-2024 the FFmpeg developers
  built with gcc 14.2.0 (crosstool-NG 1.26.0.120_4d36f27)
  configuration: --prefix=/ffbuild/prefix --pkg-config-flags=--static --pkg-config=pkg-config --cros
s-prefix=x86_64-w64-mingw32- --arch=x86_64 --target-os=mingw32 --enable-gpl --enable-version3 --disa
ble-debug --disable-w32threads --enable-pthreads --enable-iconv --enable-zlib --enable-libfreetype -
-enable-libfribidi --enable-gmp --enable-libxml2 --enable-lzma --enable-fontconfig --enable-libharfb
uzz --enable-libvorbis --enable-opencl --disable-libpulse --enable-libvmaf --disable-libxcb --disabl
e-xlib --enable-amf --enable-libaom --enable-libaribb24 --enable-avisynth --enable-chromaprint --ena
ble-libdav1d --enable-libdavs2 --enable-libdvdread --enable-libdvdnav --disable-libfdk-aac --enable-
ffnvcodec --enable-cuda-llvm --enable-frei0r --enable-libgme --enable-libkvazaar --enable-libaribcap
tion --enable-libass --enable-libbluray --enable-libjxl --enable-libmp3lame --enable-libopus --enabl
e-librist --enable-libssh --enable-libtheora --enable-libvpx --enable-libwebp --enable-libzmq --enab
le-lv2 --enable-libvpl --enable-openal --enable-libopencore-amrnb --enable-libopencore-amrwb --enabl
e-libopenh264 --enable-libopenjpeg --enable-libopenmpt --enable-librav1e --enable-librubberband --en
able-schannel --enable-sdl2 --enable-libsoxr --enable-libsrt --enable-libsvtav1 --enable-libtwolame
--enable-libuavs3d --disable-libdrm --enable-vaapi --enable-libvidstab --enable-vulkan --enable-libs
haderc --enable-libplacebo --enable-libvvenc --enable-libx264 --enable-libx265 --enable-libxavs2 --e
nable-libxvid --enable-libzimg --enable-libzvbi --extra-cflags=-DLIBTWOLAME_STATIC --extra-cxxflags=
 --extra-libs=-lgomp --extra-ldflags=-pthread --extra-ldexeflags= --cc=x86_64-w64-mingw32-gcc --cxx=
x86_64-w64-mingw32-g++ --ar=x86_64-w64-mingw32-gcc-ar --ranlib=x86_64-w64-mingw32-gcc-ranlib --nm=x8
6_64-w64-mingw32-gcc-nm --extra-version=20241016
  libavutil      59. 44.100 / 59. 44.100
  libavcodec     61. 22.100 / 61. 22.100
  libavformat    61.  9.100 / 61.  9.100
  libavdevice    61.  4.100 / 61.  4.100
  libavfilter    10.  6.100 / 10.  6.100
  libswscale      8.  6.100 /  8.  6.100
  libswresample   5.  4.100 /  5.  4.100
  libpostproc    58.  4.100 / 58.  4.100
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'xtestq.mp4':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2avc1mp41
    encoder         : Lavf61.7.100
  Duration: 00:02:00.05, start: 0.000000, bitrate: 1554 kb/s
  Stream #0:0[0x1](und): Video: h264 (High) (avc1 / 0x31637661), yuv420p(tv, bt709, progressive), 14
40x1080 [SAR 4:3 DAR 16:9], 1295 kb/s, 29.97 fps, 29.97 tbr, 30k tbn (default)
    Metadata:
      handler_name    : VideoHandler
      vendor_id       : [0][0][0][0]
      encoder         : Lavc61.19.100 h264_qsv
  Stream #0:1[0x2](und): Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 252 kb/s (defa
ult)
    Metadata:
      handler_name    : SoundHandler
      vendor_id       : [0][0][0][0]
Input #1, mpegts, from '../test.m2ts':
  Duration: 00:02:00.11, start: 1.400000, bitrate: 9589 kb/s
  Program 1
    Metadata:
      service_name    : Service01
      service_provider: FFmpeg
  Stream #1:0[0x1011]: Video: mpeg2video (Main) ([2][0][0][0] / 0x0002), yuv420p(tv, bt709, top firs
t), 1440x1080 [SAR 4:3 DAR 16:9], 29.97 fps, 29.97 tbr, 90k tbn
    Side data:
      cpb: bitrate max/min/avg: 20000000/0/0 buffer size: 9781248 vbv_delay: N/A
  Stream #1:1[0x1100]: Audio: aac (LC) ([6][0][0][0] / 0x0006), 48000 Hz, stereo, fltp, 255 kb/s
Stream mapping:
  Stream #0:0 (h264) -> libvmaf
  Stream #1:0 (mpeg2video) -> libvmaf
  libvmaf:default -> Stream #0:0 (wrapped_avframe)
  Stream #0:1 -> #0:1 (aac (native) -> pcm_s16le (native))
Press [q] to stop, [?] for help
Output #0, null, to 'pipe:':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2avc1mp41
    encoder         : Lavf61.9.100
  Stream #0:0: Video: wrapped_avframe, yuv420p(tv, bt709, progressive), 1440x1080 [SAR 4:3 DAR 16:9]
, q=2-31, 200 kb/s, 29.97 fps, 29.97 tbn
    Metadata:
      encoder         : Lavc61.22.100 wrapped_avframe
  Stream #0:1(und): Audio: pcm_s16le, 48000 Hz, stereo, s16, 1536 kb/s (default)
    Metadata:
      encoder         : Lavc61.22.100 pcm_s16le
      handler_name    : SoundHandler
      vendor_id       : [0][0][0][0]
[Parsed_libvmaf_0 @ 000001d14342d200] VMAF score: 58.628097e=N/A speed=0.506x
[out#0/null @ 000001d140fbc400] video:1544KiB audio:22500KiB subtitle:0KiB other streams:0KiB global
 headers:0KiB muxing overhead: unknown
frame= 3593 fps= 15 q=-0.0 Lsize=N/A time=00:02:00.00 bitrate=N/A speed=0.506x
```
### lscpu
```
lscpu | grep Model
Model:                              158
Model name:                         Intel(R) Core(TM) i5-7600T CPU @ 2.80GHz
```
