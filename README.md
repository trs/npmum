<p align="center">
  <a href="https://github.com/trs/npmum">
    <img alt="npmum" src="https://cdn.rawgit.com/trs/npmum/2d05a385/logo.svg" width="340" />
  </a>
</p>

<p align="center">
  Easily manage multiple npm user logins
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/npmum">
    <img alt="version" src="https://badge.fury.io/js/npmum.svg" />
  </a>
</p>

----

## Synopsis

`npmum` is a command line tool to manage your current `npm login` user.

If you've ever needed to publish to npm with multiple users, this tool is for you.

`npmum` stores tokens under a username alias. This allows you to easily switch between users by changing the token in `.npmrc` based on the username alias.

## Install

```
$ npm install npmum -g
```

## Usage

- First, obtain a token for your user from [npmjs.org](https://www.npmjs.com/)
- Run `npmum add <YOUR_USER_NAME>` and paste your token when prompted
    - You can also pass in the token with the `--token` option
- Now, whenever you want to change to this user, simply run `npmum use <YOUR_USER_NAME>`
- Use `npmum ls` to list your users and the current active user
- To remove a user, run `npmum rm <YOUR_USER_NAME>`

## API

### Add

Prompts you for a token to add under the username alias.  
You can also provide the token via `-t`/`--token`.

```
$ npmum add <user>[ --token <token>]
```

### Use

Use the token for provided username alias.  
You can specify the local of the `.npmrc` with `-p`/`--path`. This defaults to `~/.npmrc`.  
`--local` with write the a `.npmrc` in the current directory.

```
$ npmum use <user>[ --path <path>, --local]
```


### Remove

Remove a user token from the config.

```
$ npmum rm <user>
```

### List

List users and their truncated tokens, along with the current selected user.

```
$ npmum ls
```

