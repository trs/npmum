# npmum
> NPM User Manager

Easily manage multiple npm user logins.

## Install

```
npm install npmum -g
```

## Usage

### Add

Will prompt you for a token to add under the name alias.  
You can also provide the token via `-t`/`--token`.

```
npmum add <user>[ --token <token>]
```

### Use

Use the provided user.

```
npmum use <user>
```

### Remove

Remove a user from the config.

```
npmum rm <user>
```

### List

List users and their truncated tokens.

```
npmum ls
```


## What

`npmum` stores tokens under a username alias and updates `~/.npmrc` based on the set user.
