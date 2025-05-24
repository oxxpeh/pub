# gitにclone --depth 1の別コマンドを追加
「clone --depth」の別コマンドとして「sc」を追加するソース修正するDockerFile  
## 使い方
```
curl -L --compressed -O ""
docker build -t gitadd-img .
docker run -it  --name gitadd --hostname gitadd gitadd-img bash
# 以下コンテナ
cd git
make
make isntall
```

## 結果
```bash

# ../git sc https://github.com/git/git.git
Cloning into 'git'...
remote: Enumerating objects: 4763, done.
remote: Counting objects: 100% (4763/4763), done.
remote: Compressing objects: 100% (4184/4184), done.
remote: Total 4763 (delta 466), reused 2134 (delta 410), pack-reused 0 (from 0)
Receiving objects: 100% (4763/4763), 11.65 MiB | 2.77 MiB/s, done.
Resolving deltas: 100% (466/466), done.

# cd git/
# ../../git log
commit 845c48a16a7f7b2c44d8cb137b16a4a1f0140229 (grafted, HEAD -> master, origin/master, origin/HEAD)
Author: Junio C Hamano <gitster@pobox.com>
Date:   Fri May 23 15:33:39 2025 -0700

    The seventeenth batch

    Signed-off-by: Junio C Hamano <gitster@pobox.com>
#
```
## 修正箇所
```bash
cat <<- END > diff.txt
--- a/git.c
+++ b/git.c
619a620
> 	{ "sc", cmd_sc },
--- a/builtin.h
+++ b/builtin.h
224a225
> int cmd_sc(int argc, const char **argv, const char *prefix, struct repository *repo);
--- a/Makefile
+++ b/Makefile
1312a1313
> BUILTIN_OBJS += builtin/sc.o
END
patch -p1 < diff.txt
cat <<- END > builtin/sc.c
#include "builtin.h"
#include "repository.h"

int cmd_sc(int argc, const char **argv, const char *prefix, struct repository *repo)
{
    const char *depth_option = "--depth";
    const char *depth_value = "1";

    int new_argc = argc + 2;
    const char **new_argv = malloc(new_argc * sizeof(char *));

    for (int i = 0; i < argc; i++) {
        new_argv[i] = argv[i];
    }

    new_argv[argc] = depth_option;
    new_argv[argc + 1] = depth_value;

    int result = cmd_clone(new_argc, new_argv, prefix, repo);

    free(new_argv);
    free(repo); 

    return result;
}
END
```
## その他
copilotでは「git.c」まで教えてくれた。  
duckduckgoのチャットaiでも同様に  
『git で 「clone --depth 1」と同じ内容で別コマンド「sc」を作成するにはソースコードのどこを修正すればよいか教えて』と聞いたときは
「git.c」については教えてくれなかった…
