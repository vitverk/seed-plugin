"""Create and verify a deterministic, allowlisted plugin ZIP (Python standard library)."""
import json
import pathlib
import sys
import zipfile

root = pathlib.Path(sys.argv[1]).resolve()
output = pathlib.Path(sys.argv[2]).resolve()
files = json.load(sys.stdin)
assert len(files) == len(set(files)), "Duplicate archive paths"
assert output.parent != root, "Keep release artifacts outside the package root"
output.parent.mkdir(parents=True, exist_ok=True)
# Stored members avoid compressor-version variation; the package is small.
with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_STORED) as archive:
    for relative in sorted(files):
        path = root / relative
        assert not path.is_symlink() and path.is_file(), f"Not a regular file: {relative}"
        assert path.resolve().is_relative_to(root), f"Path escapes root: {relative}"
        info = zipfile.ZipInfo(relative, date_time=(2020, 1, 1, 0, 0, 0))
        info.create_system = 3
        info.external_attr = 0o100644 << 16
        info.compress_type = zipfile.ZIP_STORED
        archive.writestr(info, path.read_bytes())
with zipfile.ZipFile(output) as archive:
    assert archive.namelist() == sorted(files), "Archive inventory mismatch"
    assert archive.testzip() is None, "Archive CRC failure"
    for relative in files:
        assert archive.read(relative) == (root / relative).read_bytes(), f"Archive content mismatch: {relative}"
print(f"Verified {len(files)} files in {output.name}")
