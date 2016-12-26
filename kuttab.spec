Name: kuttab
Version: 1.0
Release: 1%{?dist}
Summary: Arabic Typing Trainer
Summary(ar): مدرب الطباعة العربية
License: WAQFv2
URL: https://ojuba.org
Source0: kuttab-%{version}.tar.xz
Requires: pywebkitgtk
BuildArch: noarch

%description
Arabic Typing Trainer

%description -l ar
مدرب الطباعة العربية

%prep
%setup -q -n %{name}
sed -i "s:/usr/share:%{_datadir}:g" kuttab

%install
mkdir -p %{buildroot}%{_datadir}/kuttab/local
mkdir -p %{buildroot}%{_bindir}
mkdir -p %{buildroot}%{_datadir}/applications
mkdir -p %{buildroot}%{_datadir}/appdata
mkdir -p %{buildroot}%{_datadir}/pixmaps

pushd local
find -type f | while read link
do
install -Dp -m 0644 $link %{buildroot}%{_datadir}/kuttab/local/$link
done
popd

install -Dp -m 0644 index.html %{buildroot}%{_datadir}/kuttab
install -Dp -m 0755 kuttab %{buildroot}%{_bindir}
install -Dp -m 0755 kuttab.desktop %{buildroot}%{_datadir}/applications
install -Dp -m 0644 kuttab.appdata.xml %{buildroot}%{_datadir}/appdata
install -Dp -m 0644 kuttab.png %{buildroot}%{_datadir}/pixmaps



%files
%license WAQFv2.pdf
%{_datadir}/kuttab/local/*
%{_datadir}/kuttab/index.html
%{_bindir}/kuttab
%{_datadir}/applications/kuttab.desktop
%{_datadir}/appdata/kuttab.appdata.xml
%{_datadir}/pixmaps/kuttab.png


%changelog
* Sun Dec 25 2016 Mosaab Alzoubi <moceap@hotmail.com> - 1.0-1
- Initial
