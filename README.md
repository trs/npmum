<p align="center">
  <img alt="npmum" src="logo.svg" width="340" />
</p>

<h3 align="center">Easily manage multiple npm user logins</h3>

<p align="center">
  <img alt="version" src="https://badge.fury.io/js/npmum.svg" />
</p>

----

## Synopsis

`npmum` is a command line tool to manage your npm login user.

By storing tokens under a username alias, the token in `~/.npmrc` will be updated based on the username.

## Install

```
$ npm install npmum -g
```

## Usage

### Add

Will prompt you for a token to add under the name alias.  
You can also provide the token via `-t`/`--token`.

```
$ npmum add <user>[ --token <token>]
```

### Use

Use the provided user.

```
$ npmum use <user>
```

### Remove

Remove a user from the config.

```
$ npmum rm <user>
```

### List

List users and their truncated tokens.

```
$ npmum ls
```

