#1.0.3

function Main()
{
  $version = GetNextVersion

  $publishRoot = "./_build"
  $containerRoot = "./_build/bin"
  $imageName = "mini-timing"
  rmdir -Force -Recurs $publishRoot
  ng build --prod --output-path _build\

  #$version
  docker build --pull -t "maxbl4/$($imageName):$version" -t "maxbl4/$($imageName):latest" -f dockerfile $publishRoot
  docker push "maxbl4/$($imageName):$version"
  docker push "maxbl4/$($imageName):latest"

  UpdateVersion $version
}

function GetNextVersion()
{
  $lines = Get-Content $MyInvocation.ScriptName
  $version = [System.Version]::Parse($lines[0].Substring(1))
  return "$($version.Major).$($version.Minor).$($version.Build + 1)"
}

function UpdateVersion($version)
{
  $lines = Get-Content $MyInvocation.ScriptName
  $lines[0] = "#$version"
  Set-Content $MyInvocation.ScriptName $lines -Encoding UTF8
}

Main
